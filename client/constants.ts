export enum Actions {
  // Camera Actions
  SetCameraInfo,
  LoadCamera,
  TakePhoto,
  SetCamera,

  // Analysis Actions
  LoadResults,
  SetResults,
  CloseResults,
  SetDetails,

  // Suggester Actions
  SuggestBad,
  SuggestGood,
  SendSuggestion
}

export enum Status {
  Unsupported,
  Uninitialized,
  Loading,
  Ready,
  Hidden
}
