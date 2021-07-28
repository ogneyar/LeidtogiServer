import './Button.css'


const Button = (props) => {
    let className = "Button "

    if (props?.readOnly) {
        className += "readOnly " 
    }else {
        if (props?.variant) {
            className += props.variant + " "
        }else className += "standartButton "
    }
    
    if (props?.className) {
        className += props?.className
    }

    return (
        <button 
            type={props?.type}			
            checked={props?.checked}
            className={className}
            style={props?.style}
            value={props?.value}
            readOnly={props?.readOnly}
            id={props?.id}
            onChange={props?.onChange}
            onClick={props?.onClick}
            title={props?.title}
            placeholder={props?.placeholder}
        >
            {props?.text ? props.text : ""}
        </button>
    )
}

export default Button