import create from 'zustand';

export const useBookStore = create((set) => ({
  book: [],
  setUser: (book) => set({ book }),
  removeUser: (ids) => {
    set((state) => ({
      book: state.book.filter((item) => !ids.includes(item._id))
    }));
  },
  addUser: (book) => {
    set((state) => ({
      book: [...state.book, book]
    }));
  },
  updateUser: (book) => {
    set((state) => ({
      book: state.book.map((item) => {
        if (item._id === book._id) {
          return book;
        }
        return item;
      })
    }));
  }
}));
