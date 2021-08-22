import { useState } from 'react'
import { API, Storage } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

import { createPark } from '../src/graphql/mutations'
import config from '../src/aws-exports'
import { useRouter } from 'next/dist/client/router'
import { Button, Container, Paper, Snackbar, TextField, Typography } from '@material-ui/core'



function CreatePark () {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    // upload the image to S3
    const uploadedImage = await Storage.put(image.name, image)
    console.log(uploadedImage)
    // submit the GraphQL query 
    const newPark = await API.graphql({
      query: createPark,
      variables: {
        input: {
          name,
          image: {
            // use the image's region and bucket (from aws-exports) as well as the key from the uploaded image
            region: config.aws_user_files_s3_bucket_region,
            bucket: config.aws_user_files_s3_bucket,
            key: uploadedImage.key
          }
        }
      }
    })
    console.log(newPark)
    router.push('/')

  }


  return (
     
    <Container component="main">
    <Paper elevation={6} style={{'padding':'2rem', 'width':'300px', 'margin':'0 auto', 'marginTop':'25vh'}}>
    <form onSubmit={handleSubmit}>
    <Typography variant="h6">Create a memory</Typography>
      
      <TextField type='text' label="title" variant="outlined" fullWidth onChange={e => setName(e.target.value)} />
      <label htmlFor='image'>Image</label>
      <input style={{'margin':'1rem 0'}}type='file' id='image' onChange={e => setImage(e.target.files[0])} />
      <Button variant="contained" color="secondary" size="small" fullWidth>Submit</Button>
    </form>
    </Paper>
    </Container>
  
   

  )
}

export default withAuthenticator(CreatePark)