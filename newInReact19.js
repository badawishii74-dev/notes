// react 19 , What'snew ?!
// react became fullstack not front-end 
// -> you can write runs in the server in react 
// -> it's called server components 
// -> that's make site fast and better SEO

// 2) ==> Actions 
// instead of build error , loading , stats , you write function only aand 
// react do other things 

// 3) New hooks :
// -> Ui
--------------------------------------

*server components (rsc)
component runs on the server instead of browser 

// Server Component
export default async function Products() {
  const data = await fetch("https://api.com/products").then(res => res.json())

  return (
    <ul>
      {data.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  )
}

---------------------------------------------
*server Actions :
*run functions in the server directly from react *

// ex:
"use server"

export async function createPost(formData) {
  const title = formData.get("title")
  await db.post.create({ data: { title } })
}


// use ut like this :
<form action={createPost}>
  <input name="title" />
  <button>Save</button>
</form>

--------------------------------
Actions : react manage forms by itself:

async function submit(formData) {
  await saveData(formData)
}

<form action={submit}>
  <button type="submit">Send</button>
</form>

react here build loading , error and reset
------------------------------------
  
