
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'

import { login, register } from './modules/accounts.js'
import { add_stock, get_stock } from './modules/stock.js'
import { add_cart, get_cart } from './modules/cart.js'

const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	const admin = context.cookies.get('admin')
	console.log(admin)
	let records = []
	let cart_data = []
	if (authorised === undefined){
		records = []
		cart_data = []
	} else if ( admin === undefined) {
		records = await get_stock()
		cart_data = await get_cart(authorised)
	}
	let counter = 0
	for (let i=0; i<cart_data.length; i++){
		counter += 1
	}
	console.log(records, cart_data, counter)
	const data = { authorised, admin, counter, sub_data: records }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.post('/', async context => {
	const body = context.request.body({ type: 'form' })
	const authorised = context.cookies.get('authorised')
	const value = await body.value
	const obj = Object.fromEntries(value)
	obj.authorised = authorised
	console.log(obj)
	// now we need to update the cart with the new item
	let status = await add_cart(obj)
	if (status == false) {
		console.log("ITEM ALREADY IN CART")
	} 
	context.response.redirect('/')
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', context => {
  // context.cookies.set('authorised', null) // this does the same
  const admin = context.cookies.get('admin')
  context.cookies.delete('authorised')
  if( admin ){
	  context.cookies.delete('admin')
  }
  context.response.redirect('/')
})


router.get('/stock', async context => {
	const authorised = context.cookies.get('authorised')
	const admin = context.cookies.get('admin')
    const records = await get_stock()
	const data = { authorised, admin, sub_data: records }
	console.log(data)
	const body = await handle.renderView('stock', data)
	context.response.body = body
})

router.get('/add_stock', async context => {
	const authorised = context.cookies.get('authorised')
	const admin = context.cookies.get('admin')
	const data = { authorised, admin }
	const body = await handle.renderView('add_stock', data)
	context.response.body = body
})

router.post('/add_stock', async context => {
	const body = context.request.body({ type: 'form-data' })
	const value = await body.value.read()
	const file = value.files[0]
	let { originalName, filename } = file
	await Deno.rename(filename, `${Deno.cwd()}/public/uploads/${originalName}`)
	file.filename = `/uploads/${originalName}`
	console.log(value)
	await add_stock(value)
	context.response.redirect('/stock')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		if (username === 'admin'){
			context.cookies.set('admin', username)
		} else {
			context.cookies.set('authorised', username)
		}
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.get('/foo', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/')
	const data = { authorised }
	const body = await handle.renderView('foo', data)
	context.response.body = body
})

export default router
