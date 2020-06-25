package nlu.project.backend.DAO;

import nlu.project.backend.entry.project.ProjectParams;
import nlu.project.backend.model.*;
import nlu.project.backend.repository.*;
import nlu.project.backend.util.constraint.ConstraintRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectDAO {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    UserRoleRepository userRoleRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BacklogRepository backlogRepository;

    public boolean isExistedProjectName(String name) {
        return projectRepository.existsByName(name);
    }

    public boolean isExistedProjectCode(String code) {
        return projectRepository.existsByCode(code);
    }

    public Project getProjectById(int id) {
        return projectRepository.findById(id).get();
    }

    public Project save(ProjectParams projectParams) {
        // Project
        Project project = new Project();
        project.setName(projectParams.name);
        project.setCode(projectParams.key);
        project.setDescription(projectParams.description);
        projectRepository.save(project);
        // Backlog
        BackLog backLog = new BackLog();
        backLog.setProject(project);
        backlogRepository.save(backLog);
        // Leader
        User teamLead = userRepository.findById(projectParams.leader).get();
        Role leadRole = roleRepository.findByName(ConstraintRole.TEAM_LEAD);
        UserRole leader = new UserRole();
        leader.setUser(teamLead);
        leader.setRole(leadRole);
        leader.setProject(project);
        userRoleRepository.save(leader);
        // Product Owner
        User creator = userRepository.findById(projectParams.productOwner).get();
        Role poRole = roleRepository.findByName(ConstraintRole.PRODUCT_OWNER);
        UserRole productOwner = new UserRole();
        productOwner.setUser(creator);
        productOwner.setRole(poRole);
        productOwner.setProject(project);
        userRoleRepository.save(productOwner);
        // End
        return project;
    }

    public Project update(Project project, ProjectParams projectParams) {
        Role leadRole = roleRepository.findByName(ConstraintRole.TEAM_LEAD);
        UserRole leader = userRoleRepository.findByRoleAndProject(leadRole, project);
        if (leader.getUser().getId() != projectParams.leader) {
            User newTeamLead = userRepository.findById(projectParams.leader).get();
            leader.setUser(newTeamLead);
            userRoleRepository.save(leader);
        }
        project.setName(projectParams.name);
        project.setCode(projectParams.key);
        project.setDescription(projectParams.description);
        projectRepository.save(project);
        return project;
    }
}
