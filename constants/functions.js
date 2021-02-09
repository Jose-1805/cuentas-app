const formattedNumber = (num, prefix) => {
      return (prefix?(prefix+' '):'') + num.toFixed(2) // always two decimal digits
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export {
	formattedNumber
}