import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectComponent = (props) => {
  const [selection, setSelection] = React.useState([]);

  const handleChange = (event) => {
    setSelection(event.target.value);

    props.filterMovies(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {props.filterName}
        </InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          multiple
          value={selection}
          //label={props.filterName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selection &&
                selected.map((element) => (
                  <Chip key={element} label={element} />
                ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {/* <MenuItem key={"all"} value={"all"}><em>All</em></MenuItem> */}
          {props.items &&
            props.items.map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  //value={{ id: item.id, name: item.name }}
                  value={item.id}
                >
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
