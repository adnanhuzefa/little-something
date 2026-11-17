// =============================================================================
//  EVERYTHING YOU NEED TO PERSONALISE LIVES IN THIS ONE FILE.
//  You never need to touch the components.
//
//  Text tips
//   • *word*     → shows the word in soft italic rose        e.g. "to *show* than"
//   • ♡          → turns into a small, consistent heart icon
//   • {her}      → her name (falls back to "you" if left empty)
//   • {me}       → your name
//
//  Photos: copy images into  public/photos/  and write the path WITHOUT a
//  leading slash, e.g.  'photos/us-1.jpg'
//
//  While you run `npm run dev` you will see dashed placeholder boxes wherever a
//  photo/memory is still empty. In the PUBLIC build (npm run build) empty
//  placeholders are hidden automatically, so she never sees an unfinished box.
// =============================================================================

const config = {
  // Browser tab title.
  pageTitle: 'A little something',

  // ---------------------------------------------------------------- names ----
  names: {
    her: '', // optional — used wherever you write {her}. Empty = "you"
    me: 'Adnan Huzefa', // Shown as the sign-off under the invitation.
  },

  // ---------------------------------------------------------------- theme ----
  // 'blush' (cream + blush + rose)  |  'sand' (warm beige + terracotta)  |  'rose' (deeper romantic)
  theme: 'blush',

  // ---------------------------------------------------------------- music ----
  // Never autoplays. A small button in the top-right lets her press play.
  // Leave src empty ('') to hide the button entirely.
  music: {
    src: '', // e.g. 'music/our-song.mp3'  (file goes in public/music/)
    volume: 0.55,
  },

  // --------------------------------------------------------- opening scene ----
  intro: {
    eyebrow: 'A little something',
    // Three lines shown one after another. The last one stays on screen.
    lines: [
      'Hey, you...', // try: 'Hey, {her}...'
      'I made a little something for you.',
      "Take a moment. There's something I'd like to share.",
    ],
    // How long (ms) lines 1 and 2 stay before the next one arrives.
    holdMs: [3600, 3800],
    button: "Let's begin ♡",
  },

  // ----------------------------------------------- Section A · introduction ----
  hello: {
    eyebrow: 'A little introduction',
    heading: 'Some things are easier to *show* than to explain...',
    sub: "So I thought I'd try something a little different.",
  },

  // -------------------------------------------- Section B · our friendship ----
  friendship: {
    eyebrow: 'Our friendship',
    heading: 'Some people just make *ordinary moments* feel a little different.',
    text: 'I really value the friendship we share. The conversations, the random moments, the laughs, and all those little things that make knowing someone special.',

    // Main portrait shown in the arch frame (portrait orientation works best).
    // Leave empty to show a soft illustrated frame instead.
    photo: 'photos/us-main.jpg', // Main photo: both of you sitting together, white kurta and red burqa
    photoAlt: 'A photo of us',

    // Small cards for real memories — add, remove or reorder freely.
    // A card needs at least a photo OR a caption to appear on the public site.
    memoriesEyebrow: 'A few moments',
    memories: [
      {
        photo: 'photos/memory-1.jpg',
        caption: '',
        note: '',
      },
      { photo: 'photos/memory-2.jpg', caption: '', note: '' },
      { photo: 'photos/memory-3.jpg', caption: '', note: '' },
    ],
  },

  // ----------------------------------------- Section C · something to say ----
  feelings: {
    eyebrow: 'Something I want to say',
    heading: "There's something I've been wanting to *tell you*...",
    paragraphs: [
      "Somewhere along the way, I started seeing our friendship a little differently. I don't know exactly when it happened, but I realised that I'd like to get to know you beyond the conversations and moments we already share.",
      'And rather than trying to explain everything through a screen, I thought it would be nicer to have a proper conversation.',
    ],
  },

  // ------------------------------------------------ Section D · visual break ----
  beach: {
    // Optional real photo (a beach at golden hour works beautifully).
    // Leave empty to use the built-in animated sunset beach.
    image: '', // e.g. 'photos/beach.jpg'
    lines: ['No rush.', 'No expectations.', 'Just a little time away from everything.'],
  },

  // --------------------------------------------- Section E · the invitation ----
  invitation: {
    eyebrow: 'The invitation',
    heading: 'So... would you like to go *somewhere* with me?',
    paragraphs: [
      'Maybe a beach, maybe somewhere peaceful, somewhere we can just sit, enjoy the evening, talk about everything and nothing, and have a conversation I\'ve been wanting to have with you.',
      'Just you and me. A little time, a beautiful place, and an honest conversation.',
    ],
    question: 'Would you like to spend an evening with me? ♡',

    // Both answers are warm and carry no pressure.
    yes: {
      label: 'Yes, I would love to ♡',
      title: "Then let's make it a beautiful evening. ♡",
      message: 'We can figure out the place and time together.',
      reply: "I'd love to ♡ Let's plan a beautiful evening.", // pre-filled text if you enable `contact`
    },
    talk: {
      label: 'No',
      title: 'Please, this option is not valid. You have to say yes! ♡',
      message: '',
      reply: 'Okay fine, I would love to ♡',
    },
    backLabel: 'Go back',
    signoff: '— {me}',
  },

  // --------------------------------------------- how she can reply to you ----
  // The site has no server, so it cannot tell you what she chose. If you want
  // an easy way for her to answer, enable ONE method below. After she picks an
  // option, an optional button appears that opens a ready-made message to you.
  // It is her choice to press it — nothing is sent automatically.
  contact: {
    method: 'none', // 'none' | 'whatsapp' | 'sms' | 'email'
    whatsapp: '', // full number with country code, e.g. '919876543210'
    phone: '', // for sms, e.g. '+919876543210'
    email: '',
    emailSubject: 'About that evening',
    labelYes: 'Let {me} know ♡',
    labelTalk: 'Message {me}',
  },

  // Show the dashed "add a photo here" boxes on the public site too.
  // Keep false so she never sees unfinished placeholders.
  showPlaceholdersInProduction: false,
}

export default config
