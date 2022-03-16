import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const RadioButtonGroup = (props) => {
return (
    <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">{props.groupName}</FormLabel>
    <RadioGroup
      row
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue={props.defaultValue}
      name="radio-buttons-group"
      onChange={props.selectAudience}
    >

    {props.radioList.map(r => {
        return <FormControlLabel key={r.value} value={r.value} control={<Radio />} label={r.label} />
    })}
    </RadioGroup>
  </FormControl>
);
}

export default RadioButtonGroup;