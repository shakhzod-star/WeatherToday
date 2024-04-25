export const state = () => ({
  say: 'hello',
  api_key: '29b179e74ff420783249b39ebbffc009',
  Latitude: 41.311081,
  Longitude: 69.240562,
})
export const actions = () => ({
  async getData() {
    console.log(1)
    return await useGet({
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${this.Latitude}&lon=${this.Longitude}&appid=${this.api_key}`,
    })
  },
})
