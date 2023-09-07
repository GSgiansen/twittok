
import { createClient } from '@supabase/supabase-js'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobGx6Y3h2YWlqZ2xsdm5hZWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5ODkyMDMsImV4cCI6MjAwOTU2NTIwM30.nYl5KpMRh0HcIO1prSr3hDbH0mehdITGRMQKH1DZFwc"
const supabaseUrl = "https://whllzcxvaijgllvnaehv.supabase.co"
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const stripeTest = async(req, res) => {
    console.log('hellooo!!!!!');
   
    try {
      const {data: events} = await supabase
      .from('booking')
      .select('*')
  
      console.log('booking', events)
      
    } catch (error) {
      console.log('error ', error);
    }
  }
stripeTest()