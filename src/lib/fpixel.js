export const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID

export const pageview = () => {
  // window.fbq('track', 'PageView')
  console.log('call fbq event')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  // window.fbq('track', name, options)
  console.log('call fbq event')
}