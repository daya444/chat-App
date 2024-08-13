export const GenderSelection = ({oncheckboxchange,selectedGender}) => {

    return (

        <div className="flex">

        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectedGender==="male" ? "selected" :""}`}>
                <span className="label-text">male</span>
                <input type="checkbox"  className="checkbox checkbox-success "
                onChange={()=> oncheckboxchange("male")}
                checked={selectedGender === "male"} />

            </label>
        </div>

        <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender==="female" ? "selected" :""}`}>
            <span className="label-text">Female</span>
            <input type="checkbox"  className="checkbox checkbox-secondary"
             onChange={()=> oncheckboxchange("female")} 
             checked={selectedGender === "female"}/>
        </label>
        </div>

    </div>

    )

     






}