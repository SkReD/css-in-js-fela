
export function controlsPanelRule() {
  return {
    flexGrow: 1,
    marginRight: '50px',
  }
}

export function cssResultRule() {
  return {
    flexGrow: 4
  }
}

export function rootRule() {
  return {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px 30px',

    '& button': {
      width: '150px',
      height: '40px'
    }
  }
}
