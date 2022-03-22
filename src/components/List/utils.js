
export const ColumnCount = ['', 1, 2, 3, 4, 6, 8, 12, 24];

export const ColumnType = ['gutter', 'column', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const ColumnCountOf = {
  type: Number,
  validator(value) {
    return ColumnCount.includes(value)
  }
}

export const ListGridType = {
  gutter: Number,
  column: ColumnCountOf,
  xs: ColumnCountOf,
  sm: ColumnCountOf,
  md: ColumnCountOf,
  lg: ColumnCountOf,
  xl: ColumnCountOf,
  xxl: ColumnCountOf,
}

export const ListSize = ['small', 'default', 'large'];
