MediaPlayer = class extends React.Component {
    render() {
        return React.createElement("div", null);
    }
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this);
        var grid = webix.ui({
            view: "datatable",
            columns: [{ id: "rank", header: "", width: 50 }, { id: "title", header: "Film title", width: 200 }, { id: "year", header: "Released", width: 80 }, { id: "votes", header: "Votes", width: 100 }],
            data: [{ id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rank: 1 }, { id: 2, title: "The Godfather", year: 1972, votes: 511495, rank: 2 }]
        });
        const exec = require('child_process').fork;
        //exec('app/lib/components/x.js');
        this.setState({ grid: grid });
    }

};

exports.MediaPlayer = MediaPlayer;