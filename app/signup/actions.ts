'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'
import { SignupFormData } from '@/components/signup-form';

export async function signup(formData: SignupFormData, idString: string, origin: string) {
  const supabase = createClient()
  const { email, password } = formData;
  const {data, error } = await supabase.auth.signUp({
    email, 
    password, 
    options: {
      emailRedirectTo: idString ? origin + `/new?ids=${idString}` : origin + '/new'
    }
  })

  let authError = null;

   // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
   if (data.user && data.user.identities && data.user.identities.length === 0) {
    console.log("in data user exists thing")
    authError = {
      name: "AuthApiError",
      message: "User already exists",
    };
    console.log(authError)
  } else if (error)
    authError = {
      name: error.name,
      message: error.message,
    };

  if (error) {
    return { success: false, errorMessage: authError?.message };
  } else {
    revalidatePath('/', 'layout')
    return { success: true };
  }
}

