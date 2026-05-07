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

before react 19 :
ex: when user login , register, update profile ...etc
you send req to server and in the same time you need to handle loading , errors , success 

before : you need to create every thing manaully :
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

and when do submitting =>> setLoading(true)
  then =>> setLoading(false)

if there an error => setError(err)

in react 19 : we get Actions 
instead of managing loading/errors => react will help you 

instead of : const [loading, setLoading] = useState(false)
we can do : const [isPending, startTransition] = useTransition()


what is startTransition ? 
  this say to react :there is an async process running . manage loading and others things 

** in the past : you are responsible for loading, errors , reset , ui freeze 
now react do loading state , ui smooth , async handling

ex: user update user info => react do `isPending = true` then btn disabled 
<button disabled={isPending}>
when requesting finished => isPending = false then btn opened 

ex code:
// Before Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    }
    redirect("/path");
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

// Using pending state from Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}





















  
  
