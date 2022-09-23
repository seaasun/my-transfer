type ValidFn = (value:string) => {status: 'default' | 'error', helperText: string}

export const validStringRequire: ValidFn
 = (value: string) => {
  if (value) {
    return {
      status: 'default',
      helperText: ''
    }
  } else {
    return {
      status: 'error',
      helperText: "请填写文字"
    }
  }
}

export const validNumberRequire: ValidFn
 = (value: unknown) => {
  
  if (value && !isNaN((value as number))) {
    return {
      status: 'default',
      helperText: ''
    }
  } else {
    return {
      status: 'error',
      helperText: "请填写数字"
    }
  }
}

export const validNumber: ValidFn
 = (value: unknown) => {
  
  if (!value || !isNaN((value as number))) {
    return {
      status: 'default',
      helperText: ''
    }
  } else {
    return {
      status: 'error',
      helperText: "请填写数字"
    }
  }
}