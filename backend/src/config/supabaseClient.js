const { createClient } = require('@supabase/supabase-js')

const supabseUrl = process.env.SUPABSE_URL
const supabseKey = process.env.SUPABSE_KEY

const supabase = createClient(supabseUrl, supabseKey)

export default supabase
