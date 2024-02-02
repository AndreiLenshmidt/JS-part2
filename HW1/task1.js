const albums = [
  {
    title: "Название 1",
    artist: "Исполнитель 1",
    year: "Год выпуска 1",
  },
  {
    title: "Название 2",
    artist: "Исполнитель 2",
    year: "Год выпуска 2",
  },
  {
    title: "Название 3",
    artist: "Исполнитель 3",
    year: "Год выпуска 3",
  },
];

const musicCollection = {
  musicAlbums: [...albums],
  [Symbol.iterator]: function () {
    let counter = 0;
    return {
      next: () => {
        if (counter < this.musicAlbums.length) {
          return { done: false, value: this.musicAlbums[counter++] };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const album of musicCollection) {
  console.log(
    `title: ${album.title}, artist: ${album.artist}, year: ${album.year}`
  );
}
