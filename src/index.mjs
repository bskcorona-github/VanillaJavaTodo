import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //未完了リスト二追加
  createIncompleteTodo(inputText);
};

//渡された引数を元に未完了のTODOを作成
const createIncompleteTodo = (todo) => {
  //li生成
  const li = document.createElement("li");
  //div生成
  const div = document.createElement("div");
  div.className = "list-row";
  //p生成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;
  //buttn完了タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親にあるliタグ配下の完了ボタンと削除ボタンを削除
    const moveTarget = completeButton.closest("li");
    completeButton.nextElementSibling.remove();
    completeButton.remove();
    //戻すボタンを生成してdiv配下に設定
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //todoの内容を取得して未完了に追加
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      //押された戻すボタンの親にあるliを削除
      backButton.closest("li").remove();
    });
    moveTarget.firstElementChild.appendChild(backButton);
    //完了リストに移動
    document.getElementById("complete-list").appendChild(moveTarget);
  });
  //削除ボタン
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親にあるliタグを未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  li.appendChild(div);

  document.getElementById("incomplete-list").appendChild(li);
};
document.getElementById("add-button").addEventListener("click", onClickAdd);
