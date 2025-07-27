import { Col, Row } from 'react-bootstrap'
import ChatList from './ChatList'
import Projects from './Projects'
import Statistics from './Statistics'
import WeeklySalesChart from './WeeklySalesChart'
import YearlySalesChart from './YearlySalesChart'

export const metadata: Metadata = { title: "Dashboard" }


// data
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { chatMessages, statistics } from './data'
import { Metadata } from 'next'

const Dashboard = () => {
  return (
    <>
      <PageBreadcrumb title="Welcome!" subName="Dashboards" />
      <Row>
        {statistics && (statistics || []).map((item, idx) => {
          return (
            <Col xxl={3} sm={6} key={idx}>
              <Statistics
                title={item.title}
                stats={item.stats}
                change={item.change}
                icon={item.icon}
                variant={item.variant}
              />
            </Col>
          )
        })}
      </Row>

      <Row>
        <Col lg={8}>
          <WeeklySalesChart />
        </Col>
        <Col lg={4}>
          <YearlySalesChart />
        </Col>
      </Row>

      <Row>
        <Col xl={4}>
          <ChatList messages={chatMessages} />
        </Col>

        <Col xl={8}>
          <Projects />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
