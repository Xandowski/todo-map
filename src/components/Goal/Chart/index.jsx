import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, YAxis } from 'recharts';
import * as _ from 'lodash';
import moment from 'moment';
import { CustomTooltipWrapper } from './style'

const groupByWeek = (log) => {
    log.sort(function (a, b) {
        return a.createdAt.localeCompare(b.createdAt);
    })
    const group = _.groupBy(log, (result) => moment(result.createdAt).startOf('isoWeek'))
    const result = []
    var weeksAgo = Object.keys(group).length - 1;
    for (const datePeriod of Object.keys(group)) {
        const date = datePeriod
        const done = group[date].filter((item) => item.done !== false)

        let start = new Date(date)
        const toDate = new Date(start.setDate(start.getDate() + 7))

        var name = `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`
        if (weeksAgo == 0) {
            name = 'This week'
        }
        result.push({
            name: name,
            date: `From ${new Date(date).toISOString().split("T")[0]} to ${weeksAgo == 0 ? 'today' : toDate.toISOString().split("T")[0]}`,
            numberOfCompletedTasks: done.length
        })
        weeksAgo -= 1
    }

    return result.reverse().slice(0, 10)
}

const groupByMonth = (log) => {
    const groupByMonth = Object.entries(log.reduce((b, a) => {
        let m = a.createdAt.split("T")[0].substr(0, 7)
        if (b.hasOwnProperty(m)) b[m].push(a); else b[m] = [a]
        return b
    }, {}))
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(e => ({ [e[0]]: e[1] }))

    const result = []
    for (const month of groupByMonth) {
        const date = Object.keys(month)[0]
        const done = month[date].filter((item) => item.done !== false)
        result.push({
            date: new Date(date).toISOString().split("T")[0],
            numberOfCompletedTasks: done.length
        })
    }

    return result
}

const fillMissingDates = (log) => {
    const dates = log.map((item) => item.createdAt.split("T")[0])
    const today = new Date();

    var minDate = new Date(today.setDate(today.getDate() - 7 * 10)).getTime()
    if (log && log.length > 0) {
        minDate = new Date(log[0].createdAt).getTime()
    }

    var currentDate = minDate
    const differenceInTime = today - currentDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (differenceInDays < 7 * 10) {
        let start = new Date(log[0].createdAt)
        currentDate = new Date(start.setDate(start.getDate() - 7 * 10)).getTime()
    }

    while (currentDate <= today) {
        let d = new Date(currentDate);
        let dateString = d.toISOString().split("T")[0]
        if (!dates.includes(dateString)) {
            log.push({
                createdAt: d.toISOString(),
                done: false
            })
        }
        currentDate += (24 * 60 * 60 * 1000);
    }

    return log
}

const logToChartData = (log) => {
    log = fillMissingDates(log)
    return groupByWeek(log)
}

const CustomTooltip = (props) => {
    if (props.payload.length == 0) {
        return null
    }

    const payload = props.payload[0].payload

    var emoji = '🙁'
    if (payload.numberOfCompletedTasks > 2) {
        emoji = '😃'
    } else if (payload.numberOfCompletedTasks) {
        emoji = '🙂'
    }

    var numberOfCompletedTasksMessage = `you have not completed this task once ${emoji}`
    if (payload.numberOfCompletedTasks > 0) {
        numberOfCompletedTasksMessage = `do you completed this task ${payload.numberOfCompletedTasks} time${payload.numberOfCompletedTasks > 1 ? 's' : ''} ${emoji}`
    }

    return (
        <CustomTooltipWrapper>
            <div className='title'>
                {payload.name}
            </div>
            <div className='content'>
                <div>
                    {payload.date}
                </div>
                <div>
                    {numberOfCompletedTasksMessage}
                </div>
            </div>
        </CustomTooltipWrapper>
    )
}

const Chart = (props) => {
    if (!props.log) {
        return null
    }

    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={logToChartData(props.log)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 7]} hide></YAxis>
                <Tooltip
                    wrapperStyle={{ outline: 'none' }}
                    content={<CustomTooltip />}
                />
                <defs>
                    <linearGradient id="completedTasksColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="25%" stopColor="#00cc44" stopOpacity={.8} />
                        <stop offset="100%" stopColor="#b3ffcc" stopOpacity={.5} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="numberOfCompletedTasks"
                    stroke="#00cc44"
                    fillOpacity={1} fill="url(#completedTasksColor)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )

}
export default Chart