class SimpleAxios {
   constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
   }

   useRequestInterceptors = (fn) => {
      this.requestInterceptors.push(fn)
   }

   useResponseInterceptors = (fn) => {
      this.responseInterceptors.push(fn)
   }

   async request(config) {
      for(const interceptor of this.requestInterceptors) {
         config = interceptor(config)
      }

      let response = await this._sendRequest(config)

      for(const interceptor of this.requestInterceptors) {
         response = interceptor(response)
      }
   }


   async _sendRequest(config) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve({
               data: 'response data',
               config
            }, 1000)
         })
      })
   }
}

const axios = new SimpleAxios()

axios.useRequestInterceptors((config) => {
   console.log('Request Interceptor:', config);

   config.header = {
      Authorization: 'Bearer token'
   }

   return config
})


axios.useResponseInterceptors((response) => {
   console.log('Response Interceptor:', response);
   response.data = `Processed: ${response.data}`

   return response
})

axios.request({
   url: '/api/req',
   method: 'GET'
}).then(res => {
   console.log('Response:', res);
})
