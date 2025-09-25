import React from 'react'
import {Link} from 'react-router'

const PageNotFound = () => {
  return (
    <div style={styles.container}>
        <h1 style={ styles.title}>404</h1>
        <p style={ styles.message}> Oops! the page you are trying to find does not exist</p>
        <Link style={styles.link} to='/' >Go back Home</Link>
    </div>
  )
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        color: "#fff"
    },
    title: {
        fontSize: '72px',
        marginBottom: '20px',
    },
    message: {
        fontSize: '18px',
        marginBottom: '30px'
    },
    link:{
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold'
    }
}

export default PageNotFound