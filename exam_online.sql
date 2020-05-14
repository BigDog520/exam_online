/*
 Navicat Premium Data Transfer

 Source Server         : a
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : exam_online

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 06/05/2020 18:53:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class_table
-- ----------------------------
DROP TABLE IF EXISTS `class_table`;
CREATE TABLE `class_table`  (
  `class_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '班级id',
  `school_id` int(10) NOT NULL COMMENT '学校id',
  `class_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '班级名词',
  PRIMARY KEY (`class_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of class_table
-- ----------------------------
INSERT INTO `class_table` VALUES (1, 1, '16软件工程6班');
INSERT INTO `class_table` VALUES (2, 2, '16软件工程6班');
INSERT INTO `class_table` VALUES (3, 1, '16物联网工程4班');
INSERT INTO `class_table` VALUES (4, 1, '16软件工程1班');
INSERT INTO `class_table` VALUES (5, 1, '16软件工程2班');
INSERT INTO `class_table` VALUES (6, 1, '16软件工程3班');
INSERT INTO `class_table` VALUES (7, 1, '16软件工程4班');
INSERT INTO `class_table` VALUES (8, 1, '16软件工程5班');
INSERT INTO `class_table` VALUES (9, 2, '16软件工程5班');
INSERT INTO `class_table` VALUES (10, 1, '16软件工程7班');
INSERT INTO `class_table` VALUES (11, 1, '16软件工程8班');
INSERT INTO `class_table` VALUES (12, 1, '16物联网工程1班');
INSERT INTO `class_table` VALUES (13, 1, '16物联网工程2班');
INSERT INTO `class_table` VALUES (14, 1, '16物联网工程3班');
INSERT INTO `class_table` VALUES (15, 1, '16软件工程9班');
INSERT INTO `class_table` VALUES (16, 1, '16软件工程10班');

-- ----------------------------
-- Table structure for exam_class_table
-- ----------------------------
DROP TABLE IF EXISTS `exam_class_table`;
CREATE TABLE `exam_class_table`  (
  `exampaper_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of exam_class_table
-- ----------------------------
INSERT INTO `exam_class_table` VALUES (1, 1, 1);
INSERT INTO `exam_class_table` VALUES (1, 4, 1);
INSERT INTO `exam_class_table` VALUES (3, 1, 7);
INSERT INTO `exam_class_table` VALUES (3, 12, 7);
INSERT INTO `exam_class_table` VALUES (1, 1, 8);
INSERT INTO `exam_class_table` VALUES (5, 10, 9);

-- ----------------------------
-- Table structure for exam_table
-- ----------------------------
DROP TABLE IF EXISTS `exam_table`;
CREATE TABLE `exam_table`  (
  `exam_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '考试试题id',
  `item_id` int(10) NOT NULL COMMENT '试题id',
  `exampaper_id` int(10) NOT NULL COMMENT '试卷id',
  `student_id` int(10) NOT NULL COMMENT '考生id',
  `exam_num` int(10) NOT NULL COMMENT '试题序号',
  `exam_answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考生答题答案',
  `exam_spoce` int(10) NOT NULL COMMENT '所得分数',
  PRIMARY KEY (`exam_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for exampaper_table
-- ----------------------------
DROP TABLE IF EXISTS `exampaper_table`;
CREATE TABLE `exampaper_table`  (
  `exampaper_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '试卷id',
  `exampaper_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试卷名称',
  `exampaper_degree` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试卷难易度',
  `exampaper_start` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '考试开始时间',
  `exampaper_end` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '考试结束时间',
  `teacher_id` int(10) NOT NULL COMMENT '教师id',
  `sub_id` int(10) NOT NULL COMMENT '科目id',
  `school_id` int(10) NOT NULL COMMENT '学校id',
  PRIMARY KEY (`exampaper_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of exampaper_table
-- ----------------------------
INSERT INTO `exampaper_table` VALUES (1, 'Node期末考试', '--', '1588089600000', '1588089600000', 1, 1, 1);
INSERT INTO `exampaper_table` VALUES (2, 'HTML期末考试', '--', '1588219578000', '1588309200000', 7, 2, 1);
INSERT INTO `exampaper_table` VALUES (4, '考试试卷', '--', '1588657945000', '1588734000000', 8, 1, 1);
INSERT INTO `exampaper_table` VALUES (5, 'Node小测', '--', '1588742306000', '1588831200000', 9, 1, 1);

-- ----------------------------
-- Table structure for itembank_table
-- ----------------------------
DROP TABLE IF EXISTS `itembank_table`;
CREATE TABLE `itembank_table`  (
  `item_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '试题id',
  `item_date` char(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试题上传时间',
  `item_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目名',
  `item_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '题目类型',
  `teacher_id` int(10) NOT NULL COMMENT '试题上传的教师id',
  `sub_id` int(10) NOT NULL COMMENT '科目id',
  `school_id` int(10) NOT NULL COMMENT '学校id',
  `item_passrate` float(10, 0) NULL DEFAULT NULL COMMENT '试题通过率',
  `item_answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '暂无参考答案' COMMENT '题目答案（可空）',
  `A_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'A选项（可空）',
  `B_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'B选项',
  `C_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'C选项',
  `D_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'D选项',
  `E_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'E选项',
  `F_option` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'F选项',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of itembank_table
-- ----------------------------
INSERT INTO `itembank_table` VALUES (1, '1574751358801', 'console有哪些常用方法?', '单选题', 1, 1, 1, NULL, 'B', ' console.log/console.info', 'console.error/console.warning', 'console.time/console.timeEnd', ' console.trace, console.table', NULL, NULL);
INSERT INTO `itembank_table` VALUES (2, '1574752157536', 'node有哪些定时功能?', '单选题', 1, 1, 1, NULL, 'A', 'setTimeout/clearTimeout', 'setInterval/clearInterval', 'setImmediate/clearImmediate', 'process.nextTick', NULL, NULL);
INSERT INTO `itembank_table` VALUES (3, '1577093968792', 'consol', '单选题', 1, 1, 1, NULL, 'A', '1', '2', '3', '4', NULL, NULL);
INSERT INTO `itembank_table` VALUES (4, '1580645201398', 'node有哪些特征，与其他服务器端对比', '单选题', 1, 1, 1, NULL, 'A', '特征：单线程、事件驱动、非阻塞I/O', 'node 无法直接渲染静态页面，提供静态服务', 'node 没有根目录的概念  　　node 必须通过路由程序指定文件才能渲染文件', 'node 比其他服务端性能更好，速度更快', NULL, NULL);
INSERT INTO `itembank_table` VALUES (5, '1585658862361', '下面关于css样式和html样式的不同之处说法正确的是（）', '单选题', 1, 2, 1, NULL, 'A', 'html样式只影响应用它的文本和使用所选html样式创建的文本   ', 'css样式只可以设置文字字体样式', 'html样式可以设置背景样式', 'html样式和css样式相同，没有区别', NULL, NULL);
INSERT INTO `itembank_table` VALUES (6, '1585660013030', '想创建一个文件，通过流的方式读取数据，该怎么做？（）', '多选题', 1, 1, 1, NULL, 'DE', '调用fs.open方法', '调用fs.read方法', '调用fs.readFile方法', '调用fs.createReadStream', '创建一个Readable流，然后监听data事件处理数据', '');
INSERT INTO `itembank_table` VALUES (7, '1585660568976', '想要监听事件，可以用下列哪些方法？（）', '多选题', 1, 1, 1, NULL, 'ABC', 'emitter.addListener', 'emitter.once', 'emitter.on', 'http.get', '', NULL);
INSERT INTO `itembank_table` VALUES (8, '1587536671191', 'W3C是指万维网联盟', '判断题', 1, 2, 1, NULL, '正确', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `itembank_table` VALUES (9, '1587536684968', '万维网联盟外文名是Web Three Consortium', '判断题', 1, 2, 1, NULL, '错误', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `itembank_table` VALUES (10, '1587537101101', 'AMD CMD规范的区别', '多选题', 1, 1, 1, NULL, 'ABCD', 'CommonJS和AMD都是JavaScript模块化规范', 'CMD依赖就近，而AMD依赖前置', 'CMD是延迟执行的，而AMD是提前执行的', 'AMD的API默认是一个当多个用，CMD的API严格区分，推崇职责单一', '', NULL);
INSERT INTO `itembank_table` VALUES (11, '1587537476430', '啊啊大大大大', '多选题', 1, 2, 1, NULL, 'AB', 'a', 'b', 'c', 'd', NULL, NULL);
INSERT INTO `itembank_table` VALUES (12, '1587542113047', '简述同步和异步的区别，如何避免回调地狱', '多选题', 1, 1, 1, NULL, 'ABCD', 'Promise', 'async/await', 'generator', '事件发布/监听模式', NULL, NULL);
INSERT INTO `itembank_table` VALUES (13, '1587543421004', 'HTML中添加水平线标签为zhidao()，设置水平线厚度的属性为()', '填空题', 1, 1, 1, NULL, 'h、size', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `itembank_table` VALUES (14, '1587543577972', 'HTML中插入表单为()标签，表单元素为文本域的type类型设置为()，表单元素为单选按钮组的type类型设置为()。', '填空题', 1, 2, 1, NULL, '<form>、单行文本是text，多行文本是textarea、button', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `itembank_table` VALUES (18, '1588219477734', 'CSS单选题', '单选题', 7, 3, 1, NULL, 'A', 'A', 'B', 'C', 'D', NULL, NULL);
INSERT INTO `itembank_table` VALUES (19, '1588657782031', 'HTML单选题', '单选题', 8, 2, 1, NULL, 'A', 'A', 'B', 'C', 'D', NULL, NULL);
INSERT INTO `itembank_table` VALUES (20, '1588742164438', 'Node单选题', '单选题', 9, 1, 1, NULL, 'A', 'A', 'B', 'C', 'D', NULL, NULL);
INSERT INTO `itembank_table` VALUES (21, '1588742183948', 'Node填空题', '填空题', 9, 1, 1, NULL, 'A', NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for school_table
-- ----------------------------
DROP TABLE IF EXISTS `school_table`;
CREATE TABLE `school_table`  (
  `school_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '学校id',
  `school_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学校名称',
  PRIMARY KEY (`school_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of school_table
-- ----------------------------
INSERT INTO `school_table` VALUES (1, '广东科技学院');
INSERT INTO `school_table` VALUES (2, '东莞理工学院');
INSERT INTO `school_table` VALUES (3, '东莞理工学院创新学院');

-- ----------------------------
-- Table structure for student_table
-- ----------------------------
DROP TABLE IF EXISTS `student_table`;
CREATE TABLE `student_table`  (
  `stu_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `stu_num` int(10) NOT NULL COMMENT '学生学号（登录账户）4位',
  `school_id` int(10) NOT NULL COMMENT '学校id',
  `stu_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生姓名',
  `stu_password` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生登录密码',
  `class_id` int(10) NOT NULL COMMENT '班级id外键（查询班级名称）',
  `stu_phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生联系方式',
  PRIMARY KEY (`stu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of student_table
-- ----------------------------
INSERT INTO `student_table` VALUES (1, 2, 1, '胡大洪', '2', 1, '13511111111');
INSERT INTO `student_table` VALUES (2, 2016131645, 1, '杨欢', '123456', 1, '13511111111');
INSERT INTO `student_table` VALUES (3, 2016131111, 1, '施德鸿', '123', 4, '13838385438');
INSERT INTO `student_table` VALUES (4, 2016111112, 2, '施德鸿', '123', 2, '13838385438');
INSERT INTO `student_table` VALUES (5, 2016111113, 2, '施德鸿', '123', 2, '13838385438');
INSERT INTO `student_table` VALUES (6, 2016131605, 1, '黄程宏', '123', 1, '13538385438');
INSERT INTO `student_table` VALUES (7, 2016131628, 1, '李宝伟', '1', 1, '13512345678');
INSERT INTO `student_table` VALUES (8, 2016131631, 1, '骆家民', '1', 1, '13712345678');
INSERT INTO `student_table` VALUES (9, 2016131301, 1, '张三', '1', 6, '13712345678');
INSERT INTO `student_table` VALUES (10, 2016131608, 1, '胡大洪', '1', 1, '13838385438');
INSERT INTO `student_table` VALUES (11, 2016131708, 1, '胡大洪', '1', 10, '13838385438');

-- ----------------------------
-- Table structure for subject_table
-- ----------------------------
DROP TABLE IF EXISTS `subject_table`;
CREATE TABLE `subject_table`  (
  `sub_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '科目id',
  `sub_name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '科目名称',
  `school_id` int(10) NOT NULL COMMENT '学校id',
  PRIMARY KEY (`sub_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of subject_table
-- ----------------------------
INSERT INTO `subject_table` VALUES (1, 'Node.js', 1);
INSERT INTO `subject_table` VALUES (2, 'Html', 1);
INSERT INTO `subject_table` VALUES (3, 'Css', 1);
INSERT INTO `subject_table` VALUES (4, 'Spring Boot', 1);
INSERT INTO `subject_table` VALUES (5, 'C程序设计', 1);
INSERT INTO `subject_table` VALUES (6, '数据库原理及应用', 1);
INSERT INTO `subject_table` VALUES (7, 'Spring Boot', 3);
INSERT INTO `subject_table` VALUES (8, 'Javascript', 1);
INSERT INTO `subject_table` VALUES (10, 'JAVA', 1);
INSERT INTO `subject_table` VALUES (11, '网页设计', 1);

-- ----------------------------
-- Table structure for teach_class_table
-- ----------------------------
DROP TABLE IF EXISTS `teach_class_table`;
CREATE TABLE `teach_class_table`  (
  `teach_class_id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(10) NOT NULL COMMENT '教师id',
  `class_id` int(10) NOT NULL COMMENT '所教班级id',
  PRIMARY KEY (`teach_class_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teach_class_table
-- ----------------------------
INSERT INTO `teach_class_table` VALUES (1, 1, 1);
INSERT INTO `teach_class_table` VALUES (2, 1, 4);
INSERT INTO `teach_class_table` VALUES (3, 1, 5);
INSERT INTO `teach_class_table` VALUES (4, 1, 6);
INSERT INTO `teach_class_table` VALUES (5, 1, 7);
INSERT INTO `teach_class_table` VALUES (6, 1, 10);
INSERT INTO `teach_class_table` VALUES (8, 6, 12);
INSERT INTO `teach_class_table` VALUES (9, 7, 1);
INSERT INTO `teach_class_table` VALUES (10, 7, 12);
INSERT INTO `teach_class_table` VALUES (11, 1, 11);
INSERT INTO `teach_class_table` VALUES (12, 1, 12);
INSERT INTO `teach_class_table` VALUES (13, 8, 1);
INSERT INTO `teach_class_table` VALUES (14, 9, 10);

-- ----------------------------
-- Table structure for teacher_table
-- ----------------------------
DROP TABLE IF EXISTS `teacher_table`;
CREATE TABLE `teacher_table`  (
  `teacher_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键 教师id',
  `teacher_num` int(6) NOT NULL COMMENT '老师教工号（登录账户）6位',
  `school_id` int(10) NOT NULL COMMENT '老师学校id',
  `teacher_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '老师姓名',
  `teacher_password` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '老师登录密码',
  `teacher_phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '老师联系方式',
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of teacher_table
-- ----------------------------
INSERT INTO `teacher_table` VALUES (1, 520131, 1, '胡大洪', '1', '13838385438');
INSERT INTO `teacher_table` VALUES (2, 520132, 3, '刘华桐', '123456', '13838385438');
INSERT INTO `teacher_table` VALUES (3, 520133, 2, '施德鸿', '123456', '13838385438');
INSERT INTO `teacher_table` VALUES (4, 123123, 1, '胡大洪', '123', '13838385438');
INSERT INTO `teacher_table` VALUES (5, 520136, 1, '胡大洪', '123', '13838385438');
INSERT INTO `teacher_table` VALUES (6, 999999, 1, '胡大洪', '123', '13838385438');
INSERT INTO `teacher_table` VALUES (7, 123456, 1, '胡大洪', '123', '13838385438');
INSERT INTO `teacher_table` VALUES (8, 111111, 1, '胡大洪', '1', '13838385438');
INSERT INTO `teacher_table` VALUES (9, 222222, 1, '胡大洪', '1', '13838385438');

SET FOREIGN_KEY_CHECKS = 1;
