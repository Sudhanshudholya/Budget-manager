import moment from 'moment'

 const formateDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a')
}

export default formateDate