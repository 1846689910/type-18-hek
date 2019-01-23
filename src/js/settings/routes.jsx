import React from "react";
import PropTypes from "prop-types";
import { renderRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";
import ReduxConcise from "../redux/ReduxConcise";
import ReactReduxConcise from "../react-redux/ReactReduxConcise";
import ReselectConcise from "../reselect/ReselectConcise";
import MobXConcise from "../mobx/MobXConcise";
import Main from "../Main";
import store from "./store";

const Root = ({ route }) => (
    <div>
        {/* 对于子组件，是必须有下方这句才能渲染路由的, 第二个参数可以添加一些props,所有的路由组件都可以通过props.abc获取到 */}
        {renderRoutes(route.routes, { abc: 123 })}
    </div>
);
Root.propTypes = {
    route: PropTypes.object
};
const routes = [
    {
        component: withRouter(Root),
        routes: [
            // 数组中的每一项，当使用到该路由的时候，可以在组件内通过props.route直接得到该对象，所以其中可以传入一些属性，通过props.route.xxx来获取
            { path: "/", exact: true, component: Main },
            { path: "/redux", exact: true, component: ReduxConcise, store },
            { path: "/react-redux", exact: true, component: ReactReduxConcise },
            { path: "/reselect", exact: true, component: ReselectConcise },
            { path: "/mobx", exact: true, component: MobXConcise }
        ]
    }
];
export { routes };
