
import Head from 'next/head'
import { API, withSSRContext,graphqlOperation, Storage } from 'aws-amplify'
import { listMemories } from '../src/graphql/queries'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import Link from 'next/link'
import { Button } from '@material-ui/core'
import { deleteMemories} from '../src/graphql/mutations'
import { useState } from 'react'

export default function Home ({ data }) {

  const [memories,setMemories] = useState(data)

  const removeItem = async (id,name)=> {
    try{
    await API.graphql(graphqlOperation(deleteMemories, { input: { id: id }}));
    await Storage.remove(name)
    const newMemories = memories.filter(memory=> memory.id !== id)
    setMemories(newMemories)
  }catch(err){
    console.log(err.message)
  }
  }

  return (
    <div>
      <Head>
        <title>My Memories</title>
      </Head>
      <div className='container'>
        <h1>Add Memories <Link href='/create-memory'>(+)</Link></h1>
        <div className='img-grid'>
          {memories.map(memory => {
            return (
              <div key={memory.id} className='img-square'>
                <h2>{memory.name}</h2>
                {/* use the AmplifyS3Image component to render the image using its S3 key */}
                <AmplifyS3Image imgKey={memory.image.key} height='200px' />
                <br/>
                <Button  color="primary" variant="contained" onClick={()=>removeItem(memory.id,memory.image.key)}>Remove</Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps () {
  const SSR = withSSRContext()
  const { data } = await SSR.API.graphql({ query: listMemories })
  return {
    props: {
      data: data.listMemories.items
    }
  }
}