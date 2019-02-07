const form = document.getElementById('vote-form');


//form submit event
form.addEventListener('submit',(e)=>{
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os:choice};
    fetch('https://morning-citadel-63254.herokuapp.com/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    e.preventDefault();
})

fetch("https://morning-citadel-63254.herokuapp.com/poll")
    .then(res => res.json())
    .then(data => {
        const votes =data.votes;
        const totalVotes = votes.length;

        const voteCounts = votes.reduce((acc,vote)=> ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)),acc), {} );
       
        let dataPoints = [
            {label:'Windows',y:voteCounts.Windows},
            {label:'MacOS',y:voteCounts.MacOS},
            {label:'Linux',y:voteCounts.Linux},
            {label:'Other',y:voteCounts.Other},

        ]

        const chartContainer =document.querySelector('#chartContainer');

        if(chartContainer){
            const chart= new CanvasJS.Chart('chartContainer',{
                animationEnabled:true,
                theme: 'theme2',
                title:{
                    text:`Votes`
                },
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            })

            chart.render();

            Pusher.logToConsole = true;

            var pusher = new Pusher('9fc269a85c673b37875e', {
            cluster: 'ap2',
            forceTLS: true
            });

            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.os){
                    x.y += data.points;
                    return x;
                } else {
                    return x;
                }
            })
            chart.render();
            });
        }


 })
