// next
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
// auth
import GuestGuard from '../../auth/GuestGuard';
// sections
import Register from '../../sections/auth/Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { query } = useRouter()

  const [phoneNumber, setPhoneNumber] = useState(null)
  useEffect(()=> {
    if (query?.n) setPhoneNumber(query.n)
  }, [query])

  // if (!phoneNumber) return <Box>Loading</Box>
  return (
    <>
      <Head>
        <title> Register | Okahub UI</title>
      </Head>

      <GuestGuard>
        <Register phoneNumberFromQuery={phoneNumber}/>
      </GuestGuard>
    </>
  );
}
