import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo.js";
import "./App.css";
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from "./service/ApiService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            //로딩 중이라는 상태를 표현할 변수 생성자에 상태변수를 추가한다.
            loading: true,
        };
    }

    componentDidMount() {
        //componentDidMount에서 Todo리스트를 가져오는 GET요청이 성공적으로 리턴하는 경우 loading을 false상태(로딩중 아님)로 고친다.
        call("/todo", "GET", null).then((response) =>
            this.setState({ items: response.data, loading: false })
        );
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    update = (item) => {
        call("/todo", "PUT", item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    render() {
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo
                            item={item}
                            key={item.id}
                            delete={this.delete}
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        //navigationBar 추가
        var navigationBar = (
            <AppBar position = "static">
                <Toolbar>
                    <Grid justifyContent="space-between" container>
                        <Grid item>
                            <Typography variant="h6">오늘의 할일</Typography>
                        </Grid>
                        <Grid>
                            <Button color="inherit" onClick={signout}>로그아웃</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        //로딩중이 아닐 때 렌더링할 부분
        var todoListPage = (
            <div>
                {navigationBar}     {/* 내비게이션바 렌더링 */}
                <Container maxWidth="md">
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );

        //로딩중일 때 렌더링할 부분
        var loadingPage = <h1>로딩 중...</h1>
        var content = loadingPage;
        if(!this.state.loading){
            /* 로딩중이 아니면 todoListPage를 선택 */
            content = todoListPage;
        }

        /* 선택한 content 렌더링 */
        return <div className="App">{content}</div>

    }
}

export default App;

/*
import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo.js";
import { Paper, List, Container } from "@material-ui/core";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }

    add = (item) => {
        const thisItems = this.state.items;
        item.id = "ID-" + thisItems.length; // key를 위한 id추가
        item.done = false; // done 초기화
        thisItems.push(item); // 배열에 아이템 추가
        this.setState({ items: thisItems }); // 업데이트는 반드시 this.setState로 해야됨.
        console.log("items : ", this.state.items);
    };

    delete = (item) => {
        const thisItems = this.state.items;
        console.log("Before Update Items : ", this.state.items);
        const newItems = thisItems.filter((e) => e.id !== item.id); // 해당 id 걸러내기
        this.setState({ items: newItems }, () => {
            // 디버깅 콜백
            console.log("Update Items : ", this.state.items);
        });
    };

    render() {
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} />
                    ))}
                </List>
            </Paper>
        );

        // 3. props로 넘겨주기
        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}

export default App;

 */