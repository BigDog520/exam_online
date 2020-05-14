//Express 提供了更好的方式，专门包装路由
var express = require('express')
//导入mysql模块
var mysql = require("mysql")


//1.创建一个路由容器
var router = express.Router()
//设置连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'exam_online'
});
//连接数据库
connection.connect();
//2.把路由挂载到路由容器中
router
  // 主页
  // .get('/', function (req, res) {
  //   res.send('hello express!')
  // })

  //登录
  .get('/login', function (req, res) {
    let login_sql, role, values
    values = [req.query.num, req.query.pwd]
    if (req.query.role == 'teacher') {
      login_sql = 'SELECT * FROM teacher_table where teacher_num = ? and teacher_password = ?'
      role = 'teacher'
    } else if (req.query.role == 'student') {
      login_sql = 'SELECT * FROM student_table where stu_num = ? and stu_password = ?'
      role = 'student'
    } else {
      res.send("登录失败")
      return;
    }
    connection.query(login_sql, values, function (error, result) {
      if (error) throw error;
      if (result[0]) {
        req.session.user = result[0];
        req.session.user.role = role
        // console.log(req.session.user)
        res.send("success")
        return;
      } else {
        res.send("账号不存在或密码错误，请重新登录")
      }
    });
  })
  //注册
  .get('/register', function (req, res) {

    //老师注册  1.检测是否有学校（如没有则添加学校） 2.检测该用户是否被注册  3.插入该老师信息
    if (req.query.role == 'teacher') {
      new Promise((resolve, reject) => {
        let school_sql = 'SELECT * FROM school_table where school_name = ?'
        connection.query(school_sql, [req.query.school], function (error, result) { //查询是否有该学校
          if (error) throw error;
          if (result[0]) {
            req.query.school = result[0].school_id
            resolve()
          } else {
            connection.query('insert into school_table values (null,"' + req.query.school + '")', function (error, result) { //插入
              if (error) throw error;
              if (result.affectedRows) {
                req.query.school = result.insertId
                resolve()
              } else {
                res.send("添加学校失败！")
                return;
              }
            })
          }
        });
      }).then(() => {
        return new Promise((resolve, reject) => {
          let num_sql = 'SELECT * FROM teacher_table where teacher_num = ? and school_id = ?'
          let values = [req.query.id, req.query.school]
          connection.query(num_sql, values, function (error, result) { //查询该用户是否被注册
            if (error) throw error;
            if (result[0]) {
              res.send("该用户已存在！~")
              return;
            } else {
              resolve()
            }
          });
        })
      }).then(() => {
        let insertsql = "insert into teacher_table values (null,?,?,?,?,?)"
        var value = [req.query.id, req.query.school, req.query.name, req.query.pwd, req.query.phone]
        connection.query(insertsql, value, function (error, result) { //插入
          if (error) throw error;
          if (result.affectedRows) {
            res.send("success")
            return;
          } else {
            res.send("注册失败！")
            return;
          }
        })
      })
    } else if (req.query.role == 'student') {
      //学生注册  1.检测是否有学校  2.检测该班级是否于数据库被添加  3.检测该用户是否被注册
      new Promise((resolve, reject) => {
        let school_sql = 'SELECT * FROM school_table where school_name = ?'
        connection.query(school_sql, [req.query.school], function (error, result) { //查询是否有该学校
          if (error) throw error;
          if (result[0]) {
            req.query.school = result[0].school_id
            resolve()
          } else {
            res.send("暂无此学院，请确认您的学校全称")
          }
        });
      }).then(() => {
        return new Promise((resolve, reject) => {
          let class_sql = 'SELECT * FROM class_table where class_name = ? and school_id = ?'
          let values = [req.query.class, req.query.school]
          connection.query(class_sql, values, function (error, result) { //查询是否有该班级
            if (error) throw error;
            if (result[0]) {
              req.query.class = result[0].class_id
              resolve()
            } else {
              res.send("此学校暂无此班级，请任课老师添加班级！")
              return;
            }
          })
        })
      }).then(() => {
        return new Promise((resolve, reject) => {
          let num_sql = 'SELECT * FROM student_table where stu_num = ? and school_id = ?'
          let values = [req.query.id, req.query.school]
          connection.query(num_sql, values, function (error, result) { //查询该用户是否被注册
            if (error) throw error;
            if (result[0]) {
              res.send("该用户已存在！~")
              return;
            } else {
              resolve()
            }
          });
        })
      }).then(() => {
        let insertsql = "insert into student_table values (null,?,?,?,?,?,?)"
        var values = [req.query.id, req.query.school, req.query.name, req.query.pwd, req.query.class, req.query.phone]
        connection.query(insertsql, values, function (error, result) { //插入
          if (error) throw error;
          if (result.affectedRows) {
            res.send("success")
            return;
          } else {
            res.send("注册失败！")
            return;
          }
        })
      })
    }

  })

  //上侧菜单的名字
  .get('/username', function (req, res) {
    if (!req.session.user) {
      res.send('login')
    } else {
      res.send(req.session.user)
    }
  })

  //添加班级
  // 1.查询该学校班级是否存在 2.插入班级
  .get('/addClass', function (req, res) {
    let class_sql = 'SELECT * FROM class_table where class_name = ? and school_id = ?'
    connection.query(class_sql, [req.query.classname, req.session.user.school_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        res.send("班级已存在!")
        return;
      } else {
        let sql = 'insert into class_table values (null,' + req.session.user.school_id + ',"' + req.query.classname + '")'
        connection.query(sql, function (error, result) {
          if (error) throw error;
          if (result.affectedRows) {
            res.send("success")
            return;
          } else {
            res.send("添加失败！")
            return;
          }
        })
      }
    })
  })


  //班级列表
  //1.查找班级总数 //2.查找班级前五条数据（或偏移量数据）
  .get('/classlist', function (req, res) {
    //如果 session 中没用户 则跳转 登录页面  
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let data = {}
    new Promise((resolve, reject) => {
      let sql, values;
      if (req.query.sreachClassName) { //如果 查找框 有数据
        sql = "select * from class_table where school_id = ? and class_name like ? order by class_name"
        values = [req.session.user.school_id, '%' + req.query.sreachClassName + '%']
      } else {
        sql = "select * from class_table where school_id = ? order by class_name"
        values = [req.session.user.school_id]
      }
      connection.query(sql, values, function (error, result) {
        if (error) throw error;
        // console.log(result)
        data.len = result.length
        if (data.len > 5) {
          resolve()
        } else {
          data.row = result
          res.send(data)
        }
      })
    }).then(() => {
      let sql, values;
      if (req.query.sreachClassName) {
        sql = "select * from class_table where school_id = ? and class_name like ? order by class_name limit ?,5" //限制5条
        values = [req.session.user.school_id, '%' + req.query.sreachClassName + '%', parseInt(req.query.offsize)]
      } else {
        sql = "select * from class_table where school_id =? order by class_name limit ?,5" //限制5条
        values = [req.session.user.school_id, parseInt(req.query.offsize)]
      }
      connection.query(sql, values, function (error, result) {
        if (error) throw error;
        data.row = result
        res.send(data)
      })
    })
  })

  //查询老师所教班级
  .get('/teach_calss_mount', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql, values;
    if (req.query.ChooseClass) {
      sql = 'select s.*,c.class_name from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id inner JOIN student_table s ON tc.class_id = s.class_id where tc.teacher_id = ? and tc.class_id = ? order by stu_num'
      values = [req.session.user.teacher_id, req.query.ChooseClass]
    } else {
      sql = 'select s.*,c.class_name from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id inner JOIN student_table s ON tc.class_id = s.class_id where tc.teacher_id = ? order by stu_num'
      values = [req.session.user.teacher_id]
    }
    connection.query(sql, values, function (error, result) {
      if (error) throw error;
      if (result[0]) {
        let data = {}
        data.count = result.length
        data.student = result
        data.option = []
        for (var i = 0; i < result.length; i++) {
          data.option[i] = {}
          data.option[i].label = result[i].class_name
          data.option[i].value = result[i].class_id
        }
        // 数组中的对象去重
        let hash = {};
        data.option = data.option.reduce((preVal, curVal) => {
          hash[curVal.value] ? '' : hash[curVal.value] = true && preVal.push(curVal);
          return preVal
        }, [])
        if (data.student.length > 7) {
          data.student.length = 7
        }
        res.send(data)
      }
    })
  })

  //查询学生列表
  .get('/studentlist', function (req, res) {
    let sql, values;
    if (req.query.ChooseClass) {
      sql = 'select s.*,c.class_name from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id inner JOIN student_table s ON tc.class_id = s.class_id where tc.teacher_id = ? and tc.class_id = ? order by stu_num limit ?,7'
      values = [req.session.user.teacher_id, req.query.ChooseClass, parseInt(req.query.offsize)]
    } else {
      sql = 'select s.*,c.class_name from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id inner JOIN student_table s ON tc.class_id = s.class_id where tc.teacher_id = ? order by stu_num limit ?,7'
      values = [req.session.user.teacher_id, parseInt(req.query.offsize)]
    }
    connection.query(sql, values, function (error, result) {
      if (error) throw error;
      res.send(result)
    })
  })

  //查询所教班级列表
  .get('/teachclass', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let data = {}
    new Promise((resolve, reject) => {
      let sql;
      if (req.query.sreachClassName) { //如果 查找框 有数据
        sql = "select c.*,tc.teach_class_id from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id WHERE tc.teacher_id = ? and class_name like ? order by class_name"
        values = [req.session.user.teacher_id, '%' + req.query.sreachClassName + '%']
      } else {
        sql = "select c.*,tc.teach_class_id from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id WHERE tc.teacher_id = ? order by class_name"
        values = [req.session.user.teacher_id]
      }
      connection.query(sql, values, function (error, result) {
        if (error) throw error;
        // console.log(result)
        data.len = result.length
        if (data.len > 5) {
          resolve()
        } else {
          data.row = result
          res.send(data)
        }
      })
    }).then(() => {
      let sql, values;
      if (req.query.sreachClassName) {
        sql = "select c.*,tc.teach_class_id from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id WHERE tc.teacher_id = ? and class_name like ? order by class_name limit ?,5" //限制5条
        values = [req.session.user.school_id, '%' + req.query.sreachClassName + '%', parseInt(req.query.offsize)]
      } else {
        sql = "select c.*,tc.teach_class_id from teach_class_table tc inner JOIN class_table c on tc.class_id = c.class_id WHERE tc.teacher_id = ? order by class_name limit ?,5" //限制5条
        values = [req.session.user.school_id, parseInt(req.query.offsize)]
      }
      connection.query(sql, values, function (error, result) {
        if (error) throw error;
        data.row = result
        res.send(data)
      })
    })
  })

  //添加所教班级
  .get('/add_teach_class', function (req, res) {
    let class_sql = 'select c.*,tc.teacher_id from teach_class_table tc RIGHT JOIN class_table c on tc.class_id = c.class_id where c.school_id = ? and c.class_name = ?'
    connection.query(class_sql, [req.session.user.school_id, req.query.class_name], function (error, result) {
      if (error) throw error;
      if (!result[0]) {
        res.send("班级不存在，请添加班级!")
      } else if (result[0].teacher_id == req.session.user.teacher_id) {
        req.query.class_name = result[0].class_id
        res.send("所教班级已存在")
      } else {
        let sql = 'insert into teach_class_table values (null,?,?)'
        connection.query(sql, [req.session.user.teacher_id, result[0].class_id], function (error, result) {
          if (error) throw error;
          if (result.affectedRows) {
            res.send("success")
          } else {
            res.send("添加失败！")
          }
        })
      }
    })
  })

  //添加科目
  .get('/addCourse', function (req, res) {
    let class_sql = 'select sub.* from subject_table sub inner JOIN school_table s on sub.school_id = s.school_id where sub.sub_name = ? and sub.school_id = ?'
    connection.query(class_sql, [req.query.sub_name, req.session.user.school_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        res.send("科目已存在!")
        return;
      } else {
        let sql = 'insert into subject_table values (null,"' + req.query.sub_name + '",' + req.session.user.school_id + ')'
        connection.query(sql, function (error, result) {
          if (error) throw error;
          if (result.affectedRows) {
            res.send("success")
            return;
          } else {
            res.send("添加失败！")
            return;
          }
        })
      }
    })
  })

  //科目列表
  .get('/CourseList', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql, values;
    if (parseInt(req.query.offsize) == 0) {
      sql = 'select * from subject_table where school_id = ?'
      values = [req.session.user.school_id]
    } else {
      sql = 'select * from subject_table where school_id = ? limit ?,5'
      values = [req.session.user.school_id, parseInt(req.query.offsize)]
    }
    connection.query(sql, values, function (error, result) {
      if (error) throw error;
      let data = {};
      if (parseInt(req.query.offsize) == 0) {
        data.count = result.length
        data.row = result
        if (data.row.length > 5) {
          data.row.length = 5
        }
      } else {
        data.row = result
      }
      res.send(data)
    })
  })

  //添加试题中  所有科目（选项）
  .get('/subject_list', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql = 'select * from subject_table where school_id = ?'
    connection.query(sql, [req.session.user.school_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        res.send(result)
      }
    })
  })
  //添加选择题
  .get('/addSingle', function (req, res) {
    let sql = 'select * from itembank_table where item_name = ? and school_id = ? and item_type = ?'
    connection.query(sql, [req.query.title, req.session.user.school_id, req.query.type], function (error, result) {
      if (error) throw error
      if (result[0]) {
        res.send("该题目已存在")
      } else {
        var insert_sql, values;
        if (req.query.type == '单选题') {
          insert_sql = 'insert into itembank_table values (null,?,?,"单选题",?,?,?,null,?,?,?,?,?,null,null)'
          values = [req.query.date, req.query.title, req.session.user.teacher_id, req.query.subject, req.session.user.school_id, req.query.answer, req.query.topicA, req.query.topicB, req.query.topicC, req.query.topicD]
        } else if (req.query.type == '多选题') {
          insert_sql = 'insert into itembank_table values (null,?,?,"多选题",?,?,?,null,?,?,?,?,?,?,?)'
          values = [req.query.date, req.query.title, req.session.user.teacher_id, req.query.subject, req.session.user.school_id, req.query.answer.join(''), JSON.parse(req.query.domains[0]).value, JSON.parse(req.query.domains[1]).value, JSON.parse(req.query.domains[2]).value, JSON.parse(req.query.domains[3]).value]
          if (req.query.domains[4] != 'null') {
            values.push(JSON.parse(req.query.domains[4]).value)
          } else {
            values.push(null)
          }
          if (req.query.domains[5] != 'null') {
            values.push(JSON.parse(req.query.domains[5]).value)
          } else {
            values.push(null)
          }
        }
        connection.query(insert_sql, values, (error, result) => {
          if (error) throw error
          if (result.affectedRows) {
            res.send("success")
          } else {
            res.send("添加失败")
          }
        })
      }
    })
  })

  // 添加判断题
  .get('/addJudge', function (req, res) {
    let sql = 'select * from itembank_table where item_name = ? and school_id = ? and item_type = ?'
    connection.query(sql, [req.query.title, req.session.user.school_id, req.query.type], function (error, result) {
      if (error) throw error
      if (result[0]) {
        res.send("该题目已存在")
      } else {
        let insert_sql = 'insert into itembank_table values (null,?,?,?,?,?,?,null,?,null,null,null,null,null,null)';
        let values = [req.query.date, req.query.title, req.query.type, req.session.user.teacher_id, req.query.subject, req.session.user.school_id, req.query.answer];
        connection.query(insert_sql, values, function (error, result) {
          if (error) throw error
          if (result.affectedRows) {
            res.send("success")
          } else {
            res.send("添加失败")
          }
        })
      }
    })
  })


  //题库试题列表
  .get('/itembank_mount', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    // if (req.query.sreachClassName) { //如果 查找框 有数据
    //   sql = "select * from class_table where school_id = ? and class_name like ? order by class_name"
    //   values = [req.session.user.school_id, '%' + req.query.sreachClassName + '%']
    // } else {
    //   sql = "select * from class_table where school_id = ? order by class_name"
    //   values = [req.session.user.school_id]
    // }
    var sql, value;
    if (req.query.type == '所有题型') {
      sql = 'select * from itembank_table where school_id = ? and sub_id = ?'
      value = [req.session.user.school_id, parseInt(req.query.subject)]
    } else {
      sql = 'select * from itembank_table where school_id = ? and item_type = ? and sub_id = ?'
      value = [req.session.user.school_id, req.query.type, parseInt(req.query.subject)]
    }
    if (parseInt(req.query.offsize) > 0) {
      sql = sql + ' limit ?,5'
      value.push(parseInt(req.query.offsize))
    }
    connection.query(sql, value, function (error, result) {
      if (error) throw error
      let data = {};
      if (parseInt(req.query.offsize) == -1) {
        data.len = result.length
        data.row = result
        if (data.row.length > 5) {
          data.row.length = 5
        }
      } else {
        data.row = result
        if (data.row.length > 5) {
          data.row.length = 5
        }
      }
      res.send(data)

    })
  })

  // 添加试卷
  .get('/addExamination', function (req, res) {
    let sql = 'select * from exampaper_table where exampaper_name = ? and school_id = ?'
    connection.query(sql, [req.query.Examinationname, req.session.user.school_id], function (error, result) {
      if (error) throw error
      if (result[0]) {
        res.send("该题目已存在")
      } else {
        let insert_sql = 'insert  into exampaper_table values (null,?,"--",?,?,?,?,?)';
        let values = [req.query.Examinationname, req.query.start_time, req.query.end_time, req.session.user.teacher_id, parseInt(req.query.ChooseSubject), req.session.user.school_id]
        connection.query(insert_sql, values, function (error, result) {
          if (error) throw error
          if (result.affectedRows) {
            res.send("success")
          } else {
            res.send("添加失败")
          }
        })
      }
    })



  })

  // 试卷列表查询
  .get('/examinationlist', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql, values;
    if (parseInt(req.query.offsize) == 0) {
      sql = 'select * from exampaper_table where school_id = ?'
      values = [req.session.user.school_id]
    } else {
      sql = 'select * from exampaper_table where school_id = ? limit ?,5'
      values = [req.session.user.teacher_id, parseInt(req.query.offsize)]
    }
    connection.query(sql, values, function (error, result) {
      if (error) throw error;
      let data = {};
      if (parseInt(req.query.offsize) == 0) {
        data.count = result.length
        data.row = result
        if (data.row.length > 5) {
          data.row.length = 5
        }
      } else {
        data.row = result
      }
      res.send(data)
    })
  })

  // 考试列表
  .get('/examlist', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql = 'select e.* from exampaper_table e join exam_class_table ec on e.exampaper_id=ec.exampaper_id where e.school_id = ? and ec.class_id = ?'
    connection.query(sql, [req.session.user.school_id, req.session.user.class_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        res.send(result)
      }
    })
  })

  // 添加所教班级列表
  .get('/exam_class', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    let sql = 'select tc.*,e.exampaper_id,c.class_name from teach_class_table tc left JOIN exam_class_table e on tc.teacher_id = e.teacher_id and tc.class_id = e.class_id  join class_table c on tc.class_id = c.class_id where tc.teacher_id = ?'
    connection.query(sql, [req.session.user.teacher_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        res.send(result)
      }
    })
  })

  // 插入考试班级
  .get('/insert_exam_class', function (req, res) {
    if (req.query.values.length == 0) {
      res.send('添加失败')
    } else {
      let sql = 'insert into exam_class_table values '
      let values = []
      for (val of req.query.values) {
        if (sql.indexOf('(?,?,?)') == -1) {
          sql += '(?,?,?)'
        } else {
          sql += ',(?,?,?)'
        }
        var v = [parseInt(req.query.exampaper_id), parseInt(val), req.session.user.teacher_id]
        values = values.concat(v)
      }
      connection.query(sql, values, function (error, result) {
        if (error) throw error;
        if (result.affectedRows) {
          res.send('success')
        }
      })
    }
  })

  // 随机生成试题
  .get('/random', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    var sql = 'select * from itembank_table where sub_id = ? and school_id = ?'
    connection.query(sql, [parseInt(req.query.sub_id),req.session.user.school_id], function (error, result) {
      if (error) throw error;
      if (result[0]) {
        var data = []
        var f = Math.floor(Math.random()*result.length)
        data.push(result[f])
        var s = Math.floor(Math.random()*result.length)
        data.push(result[s])
          // var insertsql = 'insert'
        res.send(data)
      }
    })
  })


  // 删除功能
  .get('/deletelist', function (req,res) {
    var sql = 'delete from '+req.query.table+' where '+req.query.column+' = ?'
    var value = [parseInt(req.query.id)]
    connection.query(sql,value,function (error,result) {
      if(error) throw error;
      if(result.affectedRows){
        res.send('success')
      }else{
        res.send('删除失败')
      }
    })
  })

  .get('/about', function (req, res) {
    if (!req.session.user) {
      res.send('login')
      return;
    }
    res.send('接收到的数据为' + req.query.name + ',Page About !')
  })
//3.把router导出
module.exports = router
