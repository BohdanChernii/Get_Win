export const DEFAULT_HEADERS = {"Content-Type": "application/x-www-form-urlencoded", "Accept": " application/json"};

export class Http {
   
   static async get(url) {
      try {
         return await request(decodeURIComponent(url));
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
   
   static async post(url) {
      try {
         return await request(url, "POST");
      } catch (e) {
         console.error(e);
         throw e;
      }
   }
}

async function request(url, method = "GET") {
   const config = {
      method,
      headers: DEFAULT_HEADERS,
   };
   const response = await fetch(url, config);
   return await response.json();
}
