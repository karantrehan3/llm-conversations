class Constants {
  Voice = {
    ALLOY: "alloy",
    SHIMMER: "shimmer",
    ECHO: "echo",
  };

  AudioFormat = {
    PCM16: "pcm16",
    G711_ULAW: "g711-ulaw",
    G711_ALAW: "g711-alaw",
  };

  Modality = {
    TEXT: "text",
    AUDIO: "audio",
  };

  NoTurnDetection = {
    TYPE: "none",
  };

  ServerVAD = {
    TYPE: "server_vad",
    THRESHOLD: "threshold",
    PREFIX_PADDING_MS: "prefix_padding_ms",
    SILENCE_DURATION_MS: "silence_duration_ms",
  };

  TurnDetection = {
    SERVER_VAD: "server_vad",
    NULL: null,
  };

  FunctionToolChoice = {
    TYPE: "function",
    FUNCTION: "function",
  };

  ToolChoice = {
    AUTO: "auto",
    NONE: "none",
    REQUIRED: "required",
    FUNCTION_TOOL_CHOICE: "function",
  };

  MessageRole = {
    SYSTEM: "system",
    ASSISTANT: "assistant",
    USER: "user",
  };

  InputAudioTranscription = {
    MODEL: "whisper-1",
  };

  ClientMessageBase = {
    EVENT_ID: "event_id",
  };

  ToolsDefinition = [];

  SessionUpdateParams = {
    MODEL: "model",
    MODALITIES: "modalities",
    VOICE: Object.values(this.Voice),
    INSTRUCTIONS: "instructions",
    INPUT_AUDIO_FORMAT: "input_audio_format",
    OUTPUT_AUDIO_FORMAT: "output_audio_format",
    INPUT_AUDIO_TRANSCRIPTION: "input_audio_transcription",
    TURN_DETECTION: "turn_detection",
    TOOLS: "tools",
    TOOL_CHOICE: "tool_choice",
    TEMPERATURE: "temperature",
    MAX_RESPONSE_OUTPUT_TOKENS: "max_response_output_tokens",
  };

  SessionUpdateMessage = {
    TYPE: "session.update",
    SESSION: "session",
  };

  InputAudioBufferAppendMessage = {
    TYPE: "input_audio_buffer.append",
    AUDIO: "audio",
  };

  InputAudioBufferCommitMessage = {
    TYPE: "input_audio_buffer.commit",
  };

  InputAudioBufferClearMessage = {
    TYPE: "input_audio_buffer.clear",
  };

  MessageItemType = "message";

  InputTextContentPart = {
    TYPE: "input_text",
    TEXT: "text",
  };

  InputAudioContentPart = {
    TYPE: "input_audio",
    AUDIO: "audio",
    TRANSCRIPT: "transcript",
  };

  OutputTextContentPart = {
    TYPE: "text",
    TEXT: "text",
  };

  SystemContentPart = this.InputTextContentPart;

  UserContentPart = {
    INPUT_TEXT_CONTENT_PART: this.InputTextContentPart,
    INPUT_AUDIO_CONTENT_PART: this.InputAudioContentPart,
  };

  AssistantContentPart = this.OutputTextContentPart;

  ItemParamStatus = {
    COMPLETED: "completed",
    INCOMPLETE: "incomplete",
  };

  SystemMessageItem = {
    TYPE: this.MessageItemType,
    ROLE: "system",
    ID: "id",
    CONTENT: "content",
    STATUS: "status",
  };

  UserMessageItem = {
    TYPE: this.MessageItemType,
    ROLE: "user",
    ID: "id",
    CONTENT: "content",
    STATUS: "status",
  };

  AssistantMessageItem = {
    TYPE: this.MessageItemType,
    ROLE: "assistant",
    ID: "id",
    CONTENT: "content",
    STATUS: "status",
  };

  MessageItem = {
    SYSTEM_MESSAGE_ITEM: this.SystemMessageItem,
    USER_MESSAGE_ITEM: this.UserMessageItem,
    ASSISTANT_MESSAGE_ITEM: this.AssistantMessageItem,
  };

  FunctionCallItem = {
    TYPE: "function_call",
    ID: "id",
    NAME: "name",
    CALL_ID: "call_id",
    ARGUMENTS: "arguments",
    STATUS: "status",
  };

  FunctionCallOutputItem = {
    TYPE: "function_call_output",
    ID: "id",
    CALL_ID: "call_id",
    OUTPUT: "output",
    STATUS: "status",
  };

  Item = {
    MESSAGE_ITEM: this.MessageItem,
    FUNCTION_CALL_ITEM: this.FunctionCallItem,
    FUNCTION_CALL_OUTPUT_ITEM: this.FunctionCallOutputItem,
  };

  ItemCreateMessage = {
    TYPE: "conversation.item.create",
    PREVIOUS_ITEM_ID: "previous_item_id",
    ITEM: "item",
  };

  ItemTruncateMessage = {
    TYPE: "conversation.item.truncate",
    ITEM_ID: "item_id",
    CONTENT_INDEX: "content_index",
    AUDIO_END_MS: "audio_end_ms",
  };

  ItemDeleteMessage = {
    TYPE: "conversation.item.delete",
    ITEM_ID: "item_id",
  };

  ResponseCreateParams = {
    COMMIT: "commit",
    CANCEL_PREVIOUS: "cancel_previous",
    APPEND_INPUT_ITEMS: "append_input_items",
    INPUT_ITEMS: "input_items",
    INSTRUCTIONS: "instructions",
    MODALITIES: "modalities",
    VOICE: Object.values(this.Voice),
    TEMPERATURE: "temperature",
    MAX_OUTPUT_TOKENS: "max_output_tokens",
    TOOLS: "tools",
    TOOL_CHOICE: "tool_choice",
    OUTPUT_AUDIO_FORMAT: "output_audio_format",
  };

  ResponseCreateMessage = {
    TYPE: "response.create",
    RESPONSE: "response",
  };

  ResponseCancelMessage = {
    TYPE: "response.cancel",
  };

  RealtimeError = {
    MESSAGE: "message",
    TYPE: "type",
    CODE: "code",
    PARAM: "param",
    EVENT_ID: "event_id",
  };

  ServerMessageBase = {
    EVENT_ID: "event_id",
  };

  ErrorMessage = {
    TYPE: "error",
    ERROR: "error",
  };

  Session = {
    ID: "id",
    MODEL: "model",
    MODALITIES: "modalities",
    INSTRUCTIONS: "instructions",
    VOICE: Object.values(this.Voice),
    INPUT_AUDIO_FORMAT: "input_audio_format",
    OUTPUT_AUDIO_FORMAT: "output_audio_format",
    INPUT_AUDIO_TRANSCRIPTION: "input_audio_transcription",
    TURN_DETECTION: "turn_detection",
    TOOLS: "tools",
    TOOL_CHOICE: "tool_choice",
    TEMPERATURE: "temperature",
    MAX_RESPONSE_OUTPUT_TOKENS: "max_response_output_tokens",
  };

  SessionCreatedMessage = {
    TYPE: "session.created",
    SESSION: "session",
  };

  SessionUpdatedMessage = {
    TYPE: "session.updated",
    SESSION: "session",
  };

  InputAudioBufferCommittedMessage = {
    TYPE: "input_audio_buffer.committed",
    PREVIOUS_ITEM_ID: "previous_item_id",
    ITEM_ID: "item_id",
  };

  InputAudioBufferClearedMessage = {
    TYPE: "input_audio_buffer.cleared",
  };

  InputAudioBufferSpeechStartedMessage = {
    TYPE: "input_audio_buffer.speech_started",
    AUDIO_START_MS: "audio_start_ms",
    ITEM_ID: "item_id",
  };

  InputAudioBufferSpeechStoppedMessage = {
    TYPE: "input_audio_buffer.speech_stopped",
    AUDIO_END_MS: "audio_end_ms",
    ITEM_ID: "item_id",
  };

  ResponseItemStatus = {
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    INCOMPLETE: "incomplete",
  };

  ResponseItemInputTextContentPart = {
    TYPE: "input_text",
    TEXT: "text",
  };

  ResponseItemInputAudioContentPart = {
    TYPE: "input_audio",
    TRANSCRIPT: "transcript",
  };

  ResponseItemTextContentPart = {
    TYPE: "text",
    TEXT: "text",
  };

  ResponseItemAudioContentPart = {
    TYPE: "audio",
    TRANSCRIPT: "transcript",
  };

  ResponseItemContentPart = {
    RESPONSE_ITEM_INPUT_TEXT_CONTENT_PART:
      this.ResponseItemInputTextContentPart,
    RESPONSE_ITEM_INPUT_AUDIO_CONTENT_PART:
      this.ResponseItemInputAudioContentPart,
    RESPONSE_ITEM_TEXT_CONTENT_PART: this.ResponseItemTextContentPart,
    RESPONSE_ITEM_AUDIO_CONTENT_PART: this.ResponseItemAudioContentPart,
  };

  ResponseItemBase = {
    ID: "id",
    STATUS: "status",
  };

  ResponseMessageItem = {
    TYPE: this.MessageItemType,
    ROLE: "role",
    CONTENT: "content",
  };

  ResponseFunctionCallItem = {
    TYPE: "function_call",
    NAME: "name",
    CALL_ID: "call_id",
    ARGUMENTS: "arguments",
  };

  ResponseFunctionCallOutputItem = {
    TYPE: "function_call_output",
    CALL_ID: "call_id",
    OUTPUT: "output",
  };

  ResponseItem = {
    RESPONSE_MESSAGE_ITEM: this.ResponseMessageItem,
    RESPONSE_FUNCTION_CALL_ITEM: this.ResponseFunctionCallItem,
    RESPONSE_FUNCTION_CALL_OUTPUT_ITEM:
      this.ResponseFunctionCallOutputItem,
  };

  ItemCreatedMessage = {
    TYPE: "conversation.item.created",
    PREVIOUS_ITEM_ID: "previous_item_id",
    ITEM: "item",
  };

  ItemTruncatedMessage = {
    TYPE: "conversation.item.truncated",
    ITEM_ID: "item_id",
    CONTENT_INDEX: "content_index",
    AUDIO_END_MS: "audio_end_ms",
  };

  ItemDeletedMessage = {
    TYPE: "conversation.item.deleted",
    ITEM_ID: "item_id",
  };

  ItemInputAudioTranscriptionCompletedMessage = {
    TYPE: "conversation.item.input_audio_transcription.completed",
    ITEM_ID: "item_id",
    CONTENT_INDEX: "content_index",
    TRANSCRIPT: "transcript",
  };

  ItemInputAudioTranscriptionFailedMessage = {
    TYPE: "conversation.item.input_audio_transcription.failed",
    ITEM_ID: "item_id",
    CONTENT_INDEX: "content_index",
    ERROR: "error",
  };

  ResponseStatus = {
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    INCOMPLETE: "incomplete",
    FAILED: "failed",
  };

  ResponseCancelledDetails = {
    TYPE: "cancelled",
    REASON: "reason",
  };

  ResponseIncompleteDetails = {
    TYPE: "incomplete",
    REASON: "reason",
  };

  ResponseFailedDetails = {
    TYPE: "failed",
    ERROR: "error",
  };

  ResponseStatusDetails = {
    RESPONSE_CANCELLED_DETAILS: this.ResponseCancelledDetails,
    RESPONSE_INCOMPLETE_DETAILS: this.ResponseIncompleteDetails,
    RESPONSE_FAILED_DETAILS: this.ResponseFailedDetails,
  };

  Usage = {
    TOTAL_TOKENS: "total_tokens",
    INPUT_TOKENS: "input_tokens",
    OUTPUT_TOKENS: "output_tokens",
  };

  Response = {
    ID: "id",
    STATUS: "status",
    STATUS_DETAILS: "status_details",
    OUTPUT: "output",
    USAGE: "usage",
  };

  ResponseCreatedMessage = {
    TYPE: "response.created",
    RESPONSE: "response",
  };

  ResponseDoneMessage = {
    TYPE: "response.done",
    RESPONSE: "response",
  };

  ResponseOutputItemAddedMessage = {
    TYPE: "response.output_item.added",
    RESPONSE_ID: "response_id",
    OUTPUT_INDEX: "output_index",
    ITEM: "item",
  };

  ResponseOutputItemDoneMessage = {
    TYPE: "response.output_item.done",
    RESPONSE_ID: "response_id",
    OUTPUT_INDEX: "output_index",
    ITEM: "item",
  };

  ResponseContentPartAddedMessage = {
    TYPE: "response.content_part.added",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    PART: "part",
  };

  ResponseContentPartDoneMessage = {
    TYPE: "response.content_part.done",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    PART: "part",
  };

  ResponseTextDeltaMessage = {
    TYPE: "response.text.delta",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    DELTA: "delta",
  };

  ResponseTextDoneMessage = {
    TYPE: "response.text.done",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    TEXT: "text",
  };

  ResponseAudioTranscriptDeltaMessage = {
    TYPE: "response.audio_transcript.delta",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    DELTA: "delta",
  };

  ResponseAudioTranscriptDoneMessage = {
    TYPE: "response.audio_transcript.done",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    TRANSCRIPT: "transcript",
  };

  ResponseAudioDeltaMessage = {
    TYPE: "response.audio.delta",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
    DELTA: "delta",
  };

  ResponseAudioDoneMessage = {
    TYPE: "response.audio.done",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CONTENT_INDEX: "content_index",
  };

  ResponseFunctionCallArgumentsDeltaMessage = {
    TYPE: "response.function_call_arguments.delta",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CALL_ID: "call_id",
    DELTA: "delta",
  };

  ResponseFunctionCallArgumentsDoneMessage = {
    TYPE: "response.function_call_arguments.done",
    RESPONSE_ID: "response_id",
    ITEM_ID: "item_id",
    OUTPUT_INDEX: "output_index",
    CALL_ID: "call_id",
    NAME: "name",
    ARGUMENTS: "arguments",
  };

  RateLimits = {
    NAME: "name",
    LIMIT: "limit",
    REMAINING: "remaining",
    RESET_SECONDS: "reset_seconds",
  };

  RateLimitsUpdatedMessage = {
    TYPE: "rate_limits.updated",
    RATE_LIMITS: "rate_limits",
  };

  UserMessageType = {
    SESSION_UPDATE_MESSAGE: this.SessionUpdateMessage,
    INPUT_AUDIO_BUFFER_APPEND_MESSAGE: this.InputAudioBufferAppendMessage,
    INPUT_AUDIO_BUFFER_COMMIT_MESSAGE: this.InputAudioBufferCommitMessage,
    INPUT_AUDIO_BUFFER_CLEAR_MESSAGE: this.InputAudioBufferClearMessage,
    ITEM_CREATE_MESSAGE: this.ItemCreateMessage,
    ITEM_TRUNCATE_MESSAGE: this.ItemTruncateMessage,
    ITEM_DELETE_MESSAGE: this.ItemDeleteMessage,
    RESPONSE_CREATE_MESSAGE: this.ResponseCreateMessage,
    RESPONSE_CANCEL_MESSAGE: this.ResponseCancelMessage,
  };

  ServerMessageType = {
    ERROR_MESSAGE: this.ErrorMessage,
    SESSION_CREATED_MESSAGE: this.SessionCreatedMessage,
    SESSION_UPDATED_MESSAGE: this.SessionUpdatedMessage,
    INPUT_AUDIO_BUFFER_COMMITTED_MESSAGE:
      this.InputAudioBufferCommittedMessage,
    INPUT_AUDIO_BUFFER_CLEARED_MESSAGE:
      this.InputAudioBufferClearedMessage,
    INPUT_AUDIO_BUFFER_SPEECH_STARTED_MESSAGE:
      this.InputAudioBufferSpeechStartedMessage,
    INPUT_AUDIO_BUFFER_SPEECH_STOPPED_MESSAGE:
      this.InputAudioBufferSpeechStoppedMessage,
    ITEM_CREATED_MESSAGE: this.ItemCreatedMessage,
    ITEM_TRUNCATED_MESSAGE: this.ItemTruncatedMessage,
    ITEM_DELETED_MESSAGE: this.ItemDeletedMessage,
    ITEM_INPUT_AUDIO_TRANSCRIPTION_COMPLETED_MESSAGE:
      this.ItemInputAudioTranscriptionCompletedMessage,
    ITEM_INPUT_AUDIO_TRANSCRIPTION_FAILED_MESSAGE:
      this.ItemInputAudioTranscriptionFailedMessage,
    RESPONSE_CREATED_MESSAGE: this.ResponseCreatedMessage,
    RESPONSE_DONE_MESSAGE: this.ResponseDoneMessage,
    RESPONSE_OUTPUT_ITEM_ADDED_MESSAGE:
      this.ResponseOutputItemAddedMessage,
    RESPONSE_OUTPUT_ITEM_DONE_MESSAGE: this.ResponseOutputItemDoneMessage,
    RESPONSE_CONTENT_PART_ADDED_MESSAGE:
      this.ResponseContentPartAddedMessage,
    RESPONSE_CONTENT_PART_DONE_MESSAGE:
      this.ResponseContentPartDoneMessage,
    RESPONSE_TEXT_DELTA_MESSAGE: this.ResponseTextDeltaMessage,
    RESPONSE_TEXT_DONE_MESSAGE: this.ResponseTextDoneMessage,
    RESPONSE_AUDIO_TRANSCRIPT_DELTA_MESSAGE:
      this.ResponseAudioTranscriptDeltaMessage,
    RESPONSE_AUDIO_TRANSCRIPT_DONE_MESSAGE:
      this.ResponseAudioTranscriptDoneMessage,
    RESPONSE_AUDIO_DELTA_MESSAGE: this.ResponseAudioDeltaMessage,
    RESPONSE_AUDIO_DONE_MESSAGE: this.ResponseAudioDoneMessage,
    RESPONSE_FUNCTION_CALL_ARGUMENTS_DELTA_MESSAGE:
      this.ResponseFunctionCallArgumentsDeltaMessage,
    RESPONSE_FUNCTION_CALL_ARGUMENTS_DONE_MESSAGE:
      this.ResponseFunctionCallArgumentsDoneMessage,
    RATE_LIMITS_UPDATED_MESSAGE: this.RateLimitsUpdatedMessage,
  };
}

module.exports = new Constants();
