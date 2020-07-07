package nlu.project.backend.entry.filter;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectFilterParams {
    public String name;
    public String key;
    public int userId;
    public int ownerId;
}
