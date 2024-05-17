import React from 'react'
import styled from 'styled-components'

function chat() {
    return (
        <Container>
            <div className="container"></div>
        </Container>
    )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #132a13;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #31572c;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px){
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width:360px) and (max-width:480px){
    grid-template-columns: 35% 65%;
  }
}
`

export default chat
