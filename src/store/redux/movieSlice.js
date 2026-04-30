import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteData,
  getMovies,
  postMovie,
  updateMovie,
} from "../../api/movieApi";

// THUNK (API CALL) ditrigger dengan menggunakan cth: const dispatch = useDispatch()
//  "movies/fetchMovies merupakan label/id yang dipakai oleh redux untuk mengetahui aksi apa yang harus dilakukan. Formatnya bebas tapi lebih bagus dgn: namaslice/aksi"
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const data = await getMovies();
  return data;
});

export const postMovies = createAsyncThunk(
  "movies/postMovies",
  async (newData) => {
    const data = await postMovie(newData);
    return data;
  },
);

export const updateMovies = createAsyncThunk(
  "movies/updateMovies",
  //Create async thunk hanya menerima satu paramater. Jadinya async (id, data) tu nggak bakalan jalan harus di wrap dulu jadi satu pake object "{}"
  async ({ id, data }) => {
    const updatedData = await updateMovie(id, data);
    return updatedData;
  },
);

export const deleteMovies = createAsyncThunk(
  "movies/deleteMovies",
  async ({ endpoint, id }) => {
    await deleteData(endpoint, id);
    return id;
  },
);

// SLICE; slice ibaratkan rak yang ada di gudang penyimpanan. berarti movieSlice adalah rak yang dikhususkan untuk data movie :D
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},

  // Handle result dari thunk di atas ke initial statenya
  extraReducers: (builder) => {
    // delete data
    builder
      // fetch data
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // post data
      .addCase(postMovies.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      // update data
      .addCase(updateMovies.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id,
        );

        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      // Delete data
      .addCase(deleteMovies.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => {
          return movie.id !== action.payload;
        });
      });
  },
});

export default movieSlice.reducer;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// note tentang logika sesuai pemahaman
// 1. kode
// export const store = configureStore({
//   reducer: {
//     movies: movieReducer,
//   },
// });
// yang ada di store.js itu gunanya untuk list  reducer yang ada. atau secara logikanya nama gudang.

// 2. provider di root komponen gunanya untuk memberikan kunci gudang untuk semua child componentnya

// 3. Thunk gunanya untuk bikin fungsi atau aksi yang nantinya bisa ditrigger dengan dispatch(). ibaratnya dispatch tombol untuk menjalankan aksi untuk menyimpan barang ke raknya yang sesuai (makanya label movies/fetchmovies dibutuhkan)

// 4. movieSlice itu ibaratnya nama rak yang khusus untuk movie. contohnya name: "movies" berarti nama raknya adalah movies. initialState untuk siapkan tempat untuk movie2nya.

// 5. extraReducers itu ibaratkan crane yang digunakan untuk menaruh barang ketempatnya sesuai dengan label aksi yang ditrigger mengguanakan dispatch. dicontoh ini berarti fetchMovies. Builder akan mengupdate state.movies yang sebelumnya (initialState.movies) hanya array kosong. action.payload itu barangnya

// kira2 gini kah. mohon bimbingannya suhu

// Versi (yang sudah diperbaiki sedikit)
// store
// → gudang utama + struktur state global
// Provider
// → akses ke gudang untuk semua komponen
// dispatch
// → tombol untuk menjalankan action
// Thunk
// → aksi async (API) + punya status (pending/fulfilled/rejected)
// movieSlice
// → rak khusus movies + aturan update
// extraReducers
// → menangani hasil dari thunk
// payload
// → data dari API (barang)
