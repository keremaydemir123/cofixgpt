interface Message {
  answer: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

type FileType = "js" | "css" | "html";

interface IFile {
  type: FileType;
  name: string;
  content: string;
}

interface IFilesAndChat {
  files: IFile[];
  chatId: string;
}

type ActionPrompt = "fix" | "refactor" | "comment";

interface User {
  name: string;
  email: string;
  image: string;
}

interface IReqBody {
  textPrompt: string;
  actionPrompt: ActionPrompt;
  files: IFile[];
  chatId: string;
  model: string;
  email: string;
}
