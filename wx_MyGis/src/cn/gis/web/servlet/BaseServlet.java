package cn.gis.web.servlet;

import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseServlet extends HttpServlet {

	@Override
	public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		//解决传递到微信中文乱码问题
		resp.setContentType("text/json;chartset=UTF-8");
		resp.setCharacterEncoding("UTF-8");
		try {
			//1、获得请求的method的名称
			String methodName = req.getParameter("method");
			
			//2、获得当前被请求的对象的字节码对象
			Class clazz = this.getClass();
			
			//3、获得当前字节码对象中的指定方法
			Method method = clazz.getMethod(methodName, HttpServletRequest.class,HttpServletResponse.class);
			
			//4、执行相对应的方法
			method.invoke(this, req,resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
	}
	
}