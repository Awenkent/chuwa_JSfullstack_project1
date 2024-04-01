import Button from "@mui/material/Button";
export default function UserProfile(props)
{
  return (
    <div style={{float: "right", width: "300px",marginRight:"30px"}}>
          <div style={{backgroundColor: "rgb(80,72,229)", padding: "10px 50px", color: "white",
       display:"flex",justifyContent:"space-between",alignItems:"center"
        }}><h3 >User Profile</h3>  
        
        <div>
       
        <div style={{color:"white"}}
        onClick={() => {
          props.handleClick();
        }}
      >
        X
      </div>
    
    </div>
    </div>
    <div
      style={{
       
        display:"flex",
        flexDirection:"column",
        gap:"10px",
        backgroundColor: "white",
        padding: "30px",
        maxHeight: "500px",
        overflowY:"auto"
      }}
    >
    <p>currentUser: {props?.userName}</p>
        <p>{"total:" + props?.totalPrice}</p>
        <p>role: {props?.role}</p>
      <Button onClick={props.handleChangePssword}>Change Password</Button>
    </div>
    </div>
  );
}