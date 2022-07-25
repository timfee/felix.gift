export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const align = (
  leftText: string,
  rightText: string,
  delimiter = '.',
  lineLength = 30,
  afterLeftText = ' ',
  beforeRightText = ' '
) => {
  const padAmount =
    lineLength -
    leftText.length -
    afterLeftText.length -
    beforeRightText.length -
    rightText.length

  return (
    leftText +
    afterLeftText +
    delimiter.repeat(padAmount) +
    beforeRightText +
    rightText
  )
}
