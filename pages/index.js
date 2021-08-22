import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Head from 'next/head'
import { API, withSSRContext,graphqlOperation } from 'aws-amplify'
import { listParks } from '../src/graphql/queries'
import { AmplifyS3Image } from '@aws-amplify/ui-react'
import Link from 'next/link'
import { Button } from '@material-ui/core'
import { deletePark } from '../src/graphql/mutations'
import { useState } from 'react'

export async function getServerSideProps () {
  const SSR = withSSRContext()
  const { data } = await SSR.API.graphql({ query: listParks })
  return {
    props: {
      data: data.listParks.items
    }
  }
}


export default function Home ({ data }) {

  const [parks,setParks] = useState(data)
  const removeItem = async (id)=> {
    await API.graphql(graphqlOperation(deletePark, { input: { id: id }}));
    const newParks = parks.filter(park=> park.id !== id)
    setParks(newParks)
  }

  return (
    <div>
      <Head>
        <title>National Parks</title>
      </Head>
      <div className='container'>
        <h1>National Parks <Link href='/create-park'>(+)</Link></h1>
        <div className='img-grid'>
          {parks.map(park => {
            return (
              <div key={park.id} className='img-square'>
                <h2>{park.name}</h2>
                {/* use the AmplifyS3Image component to render the park's image using its S3 key */}
                <AmplifyS3Image imgKey={park.image.key} height='200px' />
                <br/>
                <Button  color="primary" variant="contained" onClick={()=>removeItem(park.id)}>Remove</Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}