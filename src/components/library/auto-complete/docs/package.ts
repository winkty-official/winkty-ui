import manual from "../../../../../public/registry/autocomplete.json";

export const packageInfo = {
  cli: {
    command: `${process.env.BASE_URI}/registry/async-autocomplete.json`,
  },
  manual,
};
