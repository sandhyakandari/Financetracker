import './style.css'

const Button=({disabled,text,onClick,blue})=>{
    return(
        <div disabled={disabled} className={blue?'btn  btn-blue':'btn'} onClick={onClick}>
            {text}
        </div>
    )
}
export default Button;