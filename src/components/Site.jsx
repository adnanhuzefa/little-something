import Hello from './Hello'
import Friendship from './Friendship'
import Feelings from './Feelings'
import Beach from './Beach'
import Invitation from './Invitation'
import Footer from './Footer'

// The story, in order: hello → friendship → something to say → the beach → the invitation.
export default function Site({ active, petalsRef }) {
  return (
    <>
      <Hello active={active} />
      <Friendship />
      <Feelings />
      <Beach />
      <Invitation petalsRef={petalsRef} />
      <Footer />
    </>
  )
}
