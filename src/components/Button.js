function Button ({children,id,className, ...rest}) {
  return <button id={id} className={className} {...rest}>{children}</button>
}

export default Button;