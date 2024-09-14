const config = {}

config.baseUrl = import.meta.env.VITE_APP_BASE_URL
config.deviceId = 'sudhanshu'

config.getHeaders = () => {
    return {"x-access-token" : localStorage.getItem("token")}
}

export default config