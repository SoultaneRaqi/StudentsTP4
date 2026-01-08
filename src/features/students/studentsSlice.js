import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: "1", name: "Raqi Soultane", level: "S3" },
  { id: "2", name: "Achraf Hakimi", level: "S1" },
  { id: "3", name: "Mohammed Salah", level: "S2" }
];

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    updateStudent: (state, action) => {
      const { id, name, level } = action.payload;
      const existingStudent = state.find(student => student.id === id);
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.level = level;
      }
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      return state.filter(student => student.id !== id);
    }
  }
});

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions;
export default studentsSlice.reducer;