import supabase from './App';

class MakeUser {
    constructor(supabase) {
       this.supabase = supabase;
    }
 
    async signUp() {
       const { data, error } = await this.supabase.auth.signUp({
          email: 'example@email.com',
          password: 'example-password',
       });
 
       if (data) {
          console.log('user created');
          return true;
       } else {
          console.error('Error creating user:', error);
          return false;
       }
    }

    async makeProduct() {
        const number = Math.floor(Math.random() * 1000);
        const { uid, error } = await supabase.auth.getUser();   
        console.log(uid)
        // const { data, error } = await this.supabase
        // .from('products')
        // .insert(
        //     {id : number,  description: 'renew'  },
        // );
        // if (data) {
        //     console.log('product created');
        //     return true;
        //  } else {
        //     console.error('Error creating product:', error);
        //     return false;
        //  }
        return false
    }
 }

 export default MakeUser;